<template>
  <div class="page-root dashboard-page-root">
    <AppHeader />
    <main class="main-content dashboard-layout">
      <Sidebar
        :initial-sidebar-state="isSidebarOpen"
        :sections="sidebarSections"
        @update:is-sidebar-open="updateSidebarState"
      />
      <div class="dashboard-content">
        <div v-if="loading" class="loading-container">
          <p>Loading agent data...</p>
        </div>
        <div v-else-if="error" class="error-container">
          <div class="error-message">
            <h3>Unable to load agent data</h3>
            <p>{{ error }}</p>
            <p class="error-help">
              Saimiris Gateway may be unavailable.
            </p>
            <div class="button-group">
              <button @click="retryFetch" class="retry-button">Retry</button>
            </div>
          </div>
        </div>
        <div v-else class="dashboard-page-content">
          <h1 class="dashboard-title">Dashboard</h1>
          <div class="main-subtitle">Manage your measurements across the network.</div>

            <!-- usage Section -->
            <div class="auth-status">
              <div v-if="usageLoading" class="token-loading">
                <p>Loading credit information...</p>
              </div>
              <div v-else-if="usageError" class="token-error">
                <p>{{ usageError }}</p>
                <button class="retry-button" @click="retryFetchusage">Retry</button>
              </div>
              <div v-else-if="usage" class="token-container">
                <div class="token-info-row">
                  <div class="token-info-item">
                    <p class="token-label">Credits Used Today:</p>
                    <div class="token-display">
                      <span class="token-text credit-value">{{ usage.used.toLocaleString() }}</span>
                    </div>
                  </div>
                  <div class="token-info-item">
                    <p class="token-label">Daily Credits Limit:</p>
                    <div class="token-display">
                      <span class="token-text credit-value">{{ usage.limit.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
                <div class="usage-bar-container">
                  <div class="usage-bar">
                    <div
                      class="usage-bar-fill"
                      :style="{ width: `${Math.min((usage.used / usage.limit) * 100, 100)}%` }"
                      :class="{'usage-high': (usage.used / usage.limit) > 0.8 }"
                    ></div>
                  </div>
                  <div class="usage-bar-labels">
                    <span>0</span>
                    <span>{{ usage.limit.toLocaleString() }}</span>
                  </div>
                </div>
                <p class="token-help">Credits are consumed when you send probes via the measurements pipeline. Your daily limit resets at midnight UTC.</p>
              </div>
              <div v-else class="token-loading">
                <p>Credit information is not available.</p>
              </div>
            </div>

          <!-- Token Section -->
          <div class="section-container">
            <div class="auth-status">
              <div v-if="accessToken" class="token-container">
                <p class="token-label">Access Token:</p>
                <div class="token-display">
                  <span class="token-text">{{ accessToken.substring(0, 20) }}...</span>
                  <button class="copy-button" @click="copyToClipboard(accessToken)">
                    Copy
                  </button>
                </div>
                <p class="token-help">This token can be used to authenticate API requests to the Saimiris Gateway.</p>
              </div>
              <div v-else-if="tokenError" class="token-error">
                <p>Failed to retrieve access token: {{ tokenError }}</p>
                <button class="retry-button" @click="fetchAccessToken">Retry</button>
              </div>
              <div v-else class="token-loading">
                <p>Fetching access token...</p>
              </div>
            </div>

          <h2>Agents</h2>
          <table class="agents-table">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th>Source IPv6</th>
                <th>Probing Rate</th>
                <th>Min TTL</th>
                <th>Max TTL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="agent in agents" :key="agent.id" :class="{ 'unhealthy': !agent.health.healthy }">
                <td>{{ agent.id }}</td>
                <td>
                  <span :class="{ 'status-healthy': agent.health.healthy, 'status-unhealthy': !agent.health.healthy }">
                    {{ agent.health.healthy ? 'Healthy' : 'Unhealthy' }}
                  </span>
                </td>
                <td>{{ formatDate(agent.last_seen) }}</td>
                <td>
                  <div v-for="(config, index) in agent.config" :key="index">
                    {{ config.src_ipv6_addr || 'N/A' }}
                  </div>
                </td>
                <td>
                  <div v-for="(config, index) in agent.config" :key="index">
                    {{ formatRate(config.probing_rate) }}
                  </div>
                </td>
                <td>
                  <div v-for="(config, index) in agent.config" :key="index">
                    {{ config.min_ttl || 'Default' }}
                  </div>
                </td>
                <td>
                  <div v-for="(config, index) in agent.config" :key="index">
                    {{ config.max_ttl || 'Default' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useLogto } from '@logto/vue';

const { getAccessToken } = useLogto();
const isSidebarOpen = ref(false);
const accessToken = ref<string | null>(null);
const tokenError = ref<string | null>(null);
const resourceUrl = import.meta.env.VITE_LOGTO_RESOURCE_URL || 'https://saimiris.nxthdr.dev';

// Usage tracking
const usage = ref<{ used: number; limit: number } | null>(null);
const usageLoading = ref(false);
const usageError = ref<string | null>(null);

// Define the sidebar sections
const sidebarSections = [
  {
    title: 'SAIMIRIS',
    links: [
      { to: '/dashboard', text: 'Overview' }
    ]
  }
];

function updateSidebarState(isOpen: boolean) {
  isSidebarOpen.value = isOpen;
}

// Function to copy token to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Access token copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy token: ', err);
    });
};

// Get access token and store it in the component state
const fetchAccessToken = async () => {
  try {
    const token = await getAccessToken(resourceUrl);
    accessToken.value = token || null;
    tokenError.value = null;

    // Once we have the token, fetch usage
    if (token) {
      fetchUserUsage(token);
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    tokenError.value = error instanceof Error ? error.message : 'Failed to fetch access token';
    accessToken.value = null;
  }
};

// Function to fetch user usage
const fetchUserUsage = async (token: string) => {
  usageLoading.value = true;
  usageError.value = null;

  try {
    const response = await fetch('/api/saimiris/user/usage', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    usage.value = await response.json();
  } catch (err) {
    console.error('Error fetching user usage:', err);
    usageError.value = err instanceof Error ?
      err.message :
      'Unable to fetch usage information. Please try again later.';
    usage.value = null;
  } finally {
    usageLoading.value = false;
  }
};

// Function to retry fetching usage
const retryFetchusage = () => {
  if (accessToken.value) {
    fetchUserUsage(accessToken.value);
  } else {
    usageError.value = "No access token available. Please log in again.";
  }
};

// Get initial agents data
const fetchAgents = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Using the proxy endpoint that's configured in vite.config.ts
    const response = await fetch('/api/saimiris/agents', {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    agents.value = await response.json();
  } catch (err) {
    console.error('Error fetching agent data:', err);
    error.value = err instanceof Error ?
      err.message :
      'Unable to connect to the Saimiris API. Please check your network connection.';
  } finally {
    loading.value = false;
  }
};

const retryFetch = () => {
  fetchAgents();
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (e) {
    return dateString;
  }
};

const formatRate = (rate: number): string => {
  if (rate >= 1000) {
    const kRate = rate / 1000;
    // If it's a whole number, display without decimal; otherwise use 1 decimal place
    const formattedKRate = Number.isInteger(kRate) ? kRate : kRate.toFixed(1);
    return `${formattedKRate}kpps`;
  }
  return `${rate}pps`;
};

// onMounted() is now called earlier in the code
onMounted(() => {
  fetchAccessToken();
  fetchAgents();
});

interface AgentConfig {
  batch_size: number;
  instance_id: number;
  dry_run: boolean;
  min_ttl: number | null;
  max_ttl: number | null;
  integrity_check: boolean;
  interface: string;
  src_ipv4_addr: string | null;
  src_ipv6_addr: string | null;
  packets: number;
  probing_rate: number;
  rate_limiting_method: string;
}

interface AgentHealth {
  healthy: boolean;
  last_check: string;
  message: string | null;
}

interface Agent {
  id: string;
  config: AgentConfig[];
  health: AgentHealth;
  last_seen: string;
}

const agents = ref<Agent[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
</script>

<style scoped>
/* Additional style for dashboard page-root */
:deep(.dashboard-page-root) {
  display: flex;
  flex-direction: column;
}

.dashboard-layout {
  display: flex;
  gap: 0;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
}

.dashboard-content {
  flex: 1;
  padding-left: 300px; /* Account for sidebar width */
  padding-right: 1.5rem;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust for header and footer */
  padding-top: 2rem; /* Increased top padding for better spacing with titles */
  padding-bottom: 2rem; /* Add bottom padding to ensure content doesn't touch footer */
}

.loading-container, .error-container {
  padding: 20px;
  text-align: center;
}

.error-container {
  padding: 20px;
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .dashboard-content {
    padding-left: 260px; /* Account for narrower sidebar on medium screens */
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .dashboard-content {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    min-height: auto; /* Remove min-height constraint on mobile */
  }
}

.error-message {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #e0e0e0;
  max-width: 600px;
  margin: 0 auto;
}

.error-message h3 {
  color: #e53935;
  margin-top: 0;
}

.error-help {
  font-size: 0.9em;
  color: #9e9e9e;
  margin-bottom: 20px;
}

.retry-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.retry-button:hover {
  background-color: #1976d2;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.agents-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
}

.agents-table thead tr {
  background-color: #222;
  color: #ccc;
  text-align: left;
}

.agents-table th,
.agents-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #333;
}

.agents-table tbody tr {
  border-bottom: 1px solid #333;
}

.agents-table tbody tr:nth-of-type(even) {
  background-color: #1a1a1a;
}

.agents-table tbody tr:last-of-type {
  border-bottom: 2px solid #222;
}

.status-healthy {
  color: #4caf50;
  font-weight: bold;
}

.status-unhealthy {
  color: #e53935;
  font-weight: bold;
}

.unhealthy {
  background-color: rgba(229, 57, 53, 0.1) !important;
}

/* Dashboard specific styles */

/* Token display styles */
.auth-status {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.auth-status h3, .auth-status h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-heading);
}

.token-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.token-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
}

.token-info-item {
  flex: 1;
  min-width: 150px;
}

.token-label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

.token-display {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  overflow: hidden;
}

.token-text {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  color: var(--color-accent);
}

.token-text .credit-value {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: inherit;
  color: var(--color-text);
}

.token-help {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

.copy-button {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.copy-button:hover {
  background-color: #1976d2;
}

.token-error {
  color: #e53935;
  padding: 0.75rem;
  background-color: rgba(229, 57, 53, 0.1);
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.token-loading {
  color: var(--color-text-muted);
  font-style: italic;
}

/* usage bar styles - keep these */
.usage-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.75rem 0;
}

.usage-bar {
  height: 10px;
  background-color: #2a2a2a;
  border-radius: 5px;
  overflow: hidden;
}

.usage-bar-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px 0 0 5px;
  transition: width 0.3s ease;
}

.usage-bar-fill.usage-high {
  background-color: #e53935;
}

.usage-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
