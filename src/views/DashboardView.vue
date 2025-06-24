<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <h1>Dashboard</h1>
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
          <div v-else>
            <h2>Saimiris Agents</h2>
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
    console.log('Successfully fetched agent data:', agents.value);
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

onMounted(() => {
  fetchAgents();
});
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
</style>

