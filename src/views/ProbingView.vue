<template>
  <div class="page-root dashboard-page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div v-if="loading" class="loading-container">
          <p>Loading probing data...</p>
        </div>
        <div v-else-if="error" class="error-container">
          <div class="error-message">
            <h3>Unable to load probing data</h3>
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
          <h1 class="dashboard-title">Probing</h1>
          <div class="main-subtitle">Manage your measurements across the network.</div>

          <div class="alert alert-info">
            <strong>New to nxthdr?</strong> Check out the <router-link to="/docs/measurements" class="docs-link">documentation</router-link> to learn how to send your first probes.
          </div>

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
                  <button
                    class="copy-button"
                    :class="{ 'copy-button-copied': tokenCopied }"
                    @click="copyToClipboard(accessToken)"
                  >
                    {{ tokenCopied ? 'Copied!' : 'Copy' }}
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
          </div>

          <!-- Agents Section -->
          <div class="section-container">
            <h2>Agents</h2>
          <div class="table-container">
            <table class="agents-table">
              <thead>
                <tr>
                  <th>Agent ID</th>
                  <th>Status</th>
                  <th>Your IPv6 Prefixes</th>
                  <th>Probing Rate</th>
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
                <td>
                  <div v-if="prefixesLoading" class="loading-text">Loading...</div>
                  <div v-else-if="prefixesError" class="error-text">Error loading prefixes</div>
                  <div v-else>
                    <!-- Show each config with its corresponding user prefix -->
                    <div v-for="(config, configIndex) in agent.config" :key="configIndex" class="prefix-line">
                      <span v-if="config.name" class="config-name-inline">[{{ config.name }}]</span>
                      {{ getUserPrefixesForAgent(agent.id)[configIndex] || 'No prefix available' }}
                    </div>
                    <div v-if="agent.config.length === 0" class="no-prefixes">
                      No configuration available
                    </div>
                  </div>
                </td>
                <td>
                  <!-- Show probing rates aligned with configs -->
                  <div v-for="(config, configIndex) in agent.config" :key="configIndex" class="rate-line">
                    {{ formatRate(config.probing_rate) }}
                  </div>
                  <div v-if="agent.config.length === 0" class="no-config">
                    No configuration
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useLogto } from '@logto/vue';
import { createApiClient } from '@/utils/api';

const logto = useLogto();
const { getAccessToken } = logto;
const accessToken = ref<string | null>(null);
const tokenError = ref<string | null>(null);
const resourceUrl = import.meta.env.VITE_LOGTO_RESOURCE_URL || 'https://saimiris.nxthdr.dev';

// Create API client with automatic token refresh
const apiClient = createApiClient(logto, resourceUrl);

// Copy state tracking
const tokenCopied = ref(false);

// Usage tracking
const usage = ref<{ used: number; limit: number } | null>(null);
const usageLoading = ref(false);
const usageError = ref<string | null>(null);

// User prefixes tracking
const userPrefixes = ref<any | null>(null);
const prefixesLoading = ref(false);
const prefixesError = ref<string | null>(null);

// Refresh intervals
const tokenRefreshInterval = ref<number | null>(null);
const usageRefreshInterval = ref<number | null>(null);
const agentsRefreshInterval = ref<number | null>(null);

// Function to copy token to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      // Show copied state
      tokenCopied.value = true;
      // Reset after 2 seconds
      setTimeout(() => {
        tokenCopied.value = false;
      }, 2000);
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
      fetchUserUsage();
      fetchUserPrefixes();
    }
  } catch (error) {
    console.error('Error fetching access token:', error);

    // Check if this is a session expiration error
    if (error instanceof Error && (
      error.message.includes('invalid_grant') ||
      error.message.includes('grant request is invalid') ||
      error.message.includes('Session expired')
    )) {
      // Session expired, sign out and redirect to home
      tokenError.value = 'Session expired. Redirecting to sign in...';
      await logto.signOut(window.location.origin);
      return;
    }

    tokenError.value = error instanceof Error ? error.message : 'Failed to fetch access token';
    accessToken.value = null;
  }
};

// Function to fetch user usage
const fetchUserUsage = async () => {
  usageLoading.value = true;
  usageError.value = null;

  try {
    const response = await apiClient.get('/api/saimiris/user/me');

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

// Function to fetch user prefixes
const fetchUserPrefixes = async () => {
  prefixesLoading.value = true;
  prefixesError.value = null;

  try {
    const response = await apiClient.get('/api/saimiris/user/prefixes');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    userPrefixes.value = await response.json();
  } catch (err) {
    console.error('Error fetching user prefixes:', err);
    prefixesError.value = err instanceof Error ?
      err.message :
      'Unable to fetch prefix information. Please try again later.';
    userPrefixes.value = null;
  } finally {
    prefixesLoading.value = false;
  }
};

// Function to retry fetching usage
const retryFetchusage = () => {
  fetchUserUsage();
  fetchUserPrefixes();
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
      'Unable to connect to the Saimiris Gateway. Please check your network connection.';
  } finally {
    loading.value = false;
  }
};

const retryFetch = () => {
  fetchAgents();
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

// Function to get user prefixes for a specific agent
const getUserPrefixesForAgent = (agentId: string): string[] => {
  if (!userPrefixes.value || !userPrefixes.value.agents) {
    return [];
  }

  const agentData = userPrefixes.value.agents.find((agent: any) => agent.agent_id === agentId);
  if (!agentData || !agentData.prefixes) {
    return [];
  }

  return agentData.prefixes.map((prefix: any) => prefix.user_prefix);
};

// Setup refresh intervals
const startRefreshIntervals = () => {
  // Refresh token every 30 minutes (1800000 ms)
  tokenRefreshInterval.value = setInterval(() => {
    fetchAccessToken();
  }, 1800000);

  // Refresh usage every 5 minutes (300000 ms)
  usageRefreshInterval.value = setInterval(() => {
    fetchUserUsage();
    fetchUserPrefixes();
  }, 300000);

  // Refresh agents every 2 minutes (120000 ms)
  agentsRefreshInterval.value = setInterval(() => {
    fetchAgents();
  }, 120000);
};

// Clear refresh intervals
const clearRefreshIntervals = () => {
  if (tokenRefreshInterval.value) {
    clearInterval(tokenRefreshInterval.value);
    tokenRefreshInterval.value = null;
  }
  if (usageRefreshInterval.value) {
    clearInterval(usageRefreshInterval.value);
    usageRefreshInterval.value = null;
  }
  if (agentsRefreshInterval.value) {
    clearInterval(agentsRefreshInterval.value);
    agentsRefreshInterval.value = null;
  }
};

// onMounted() is now called earlier in the code
onMounted(() => {
  fetchAccessToken();
  fetchAgents();
  startRefreshIntervals();
});

onUnmounted(() => {
  clearRefreshIntervals();
});

interface AgentConfig {
  name?: string;
  batch_size: number;
  instance_id: number;
  dry_run: boolean;
  min_ttl: number | null;
  max_ttl: number | null;
  integrity_check: boolean;
  interface: string;
  src_ipv4_prefix: string | null;
  src_ipv6_prefix: string | null;
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
.loading-container, .error-container {
  padding: 20px;
  text-align: center;
}

.error-container {
  padding: 20px;
  width: 100%;
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

/* Dashboard specific styles */

/* Help section styles */
.help-section {
  background-color: rgba(var(--color-accent-rgb, 45, 212, 191), 0.1);
  border: 1px solid rgba(var(--color-accent-rgb, 45, 212, 191), 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.help-section p {
  margin: 0;
  color: var(--color-text);
}

.docs-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.docs-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

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
  min-width: 60px;
}

.copy-button:hover {
  background-color: #1976d2;
}

.copy-button-copied {
  background-color: #4caf50 !important;
  cursor: default;
}

.copy-button-copied:hover {
  background-color: #4caf50 !important;
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

/* Prefix display styles */
.loading-text {
  font-style: italic;
  color: var(--color-text-muted);
  font-size: 0.9em;
}

.error-text {
  color: #e53935;
  font-size: 0.9em;
}

.no-prefixes {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.9em;
}

/* Configuration and prefix display styles */
.config-prefix-group {
  margin-bottom: 0.4rem;
}

.config-prefix-group:last-child {
  margin-bottom: 0;
}

.config-rate-group {
  margin-bottom: 0.4rem;
}

.config-rate-group:last-child {
  margin-bottom: 0;
}

.prefix-line {
  margin-bottom: 0.1rem;
  line-height: 1.3;
  padding: 0.1rem 0;
  min-height: 1.3em;
  font-size: 0.9em;
}

.prefix-line:last-child {
  margin-bottom: 0;
}

.rate-line {
  margin-bottom: 0.1rem;
  line-height: 1.3;
  padding: 0.1rem 0;
  font-size: 0.9em;
  min-height: 1.3em;
}

.rate-line:last-child {
  margin-bottom: 0;
}

.config-name-inline {
  font-weight: 600;
  font-size: 0.85em;
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  display: inline-block;
  min-width: 4em;
}

.no-config {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.9em;
}

.no-prefixes {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.9em;
}
</style>
