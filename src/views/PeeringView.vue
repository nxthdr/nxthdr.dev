<template>
  <div class="page-root peering-page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div v-if="loading" class="loading-container">
          <p>Loading peering information...</p>
        </div>
        <div v-else-if="error" class="error-container">
          <div class="error-message">
            <h3>Unable to load peering data</h3>
            <p>{{ error }}</p>
            <p class="error-help">
              PeerLab Gateway may be unavailable.
            </p>
            <div class="button-group">
              <button @click="retryFetch" class="retry-button">Retry</button>
            </div>
          </div>
        </div>
        <div v-else class="dashboard-page-content">
          <h1 class="dashboard-title">Peering</h1>
          <div class="main-subtitle">Connect to real Internet Exchange Points.</div>

          <div class="alert alert-info">
            <strong>What is PeerLab?</strong> PeerLab allows you to connect to real IXPs and receive the full IPv6 routing table.
          </div>

          <!-- ASN Section -->
          <div class="section-container">
            <h2>Your ASN</h2>
            <div v-if="asnLoading" class="info-loading">
              <p>Loading ASN information...</p>
            </div>
            <div v-else-if="asnError" class="info-error">
              <p>{{ asnError }}</p>
              <button class="retry-button" @click="fetchUserInfo">Retry</button>
            </div>
            <div v-else-if="userInfo && userInfo.asn" class="asn-container">
              <div class="asn-display">
                <div class="asn-label">Assigned ASN:</div>
                <div class="asn-value">AS{{ userInfo.asn }}</div>
              </div>
              <p class="info-help">
                This is your private ASN for use with PeerLab. Use it to configure your BIRD instance and establish BGP sessions with IXP peers.
              </p>
            </div>
            <div v-else class="asn-container">
              <p class="info-help">You don't have an ASN assigned yet. An ASN will be automatically assigned when you request one.</p>
              <button
                class="request-button"
                @click="requestAsn"
                :disabled="requestingAsn"
              >
                {{ requestingAsn ? 'Requesting...' : 'Request ASN' }}
              </button>
            </div>
          </div>

          <!-- Prefix Lease Section -->
          <div class="section-container">
            <h2>IPv6 Prefix Lease</h2>
            <div class="prefix-lease-content">
              <p class="info-help">
                Lease an IPv6 /48 prefix for a specified duration to use with PeerLab.
                <span v-if="userInfo?.max_leases">You can have up to {{ userInfo.max_leases }} active lease{{ userInfo.max_leases > 1 ? 's' : '' }}.</span>
              </p>

              <!-- Error Message -->
              <div v-if="prefixError" class="alert alert-error">
                <p><strong>Error:</strong> {{ prefixError }}</p>
              </div>

              <!-- Active Leases -->
              <div v-if="userInfo && userInfo.active_leases.length > 0" class="active-leases">
                <h3>Active Leases</h3>
                <div class="leases-list">
                  <div v-for="lease in userInfo.active_leases" :key="lease.prefix" class="lease-item">
                    <div class="lease-content">
                      <div class="lease-prefix">
                        <span class="prefix-label">Prefix:</span>
                        <code class="prefix-value">{{ lease.prefix }}</code>
                      </div>
                      <div class="lease-times">
                        <div class="lease-time">
                          <span class="time-label">Start:</span>
                          <span class="time-value">{{ formatDateTime(lease.start_time) }}</span>
                        </div>
                        <div class="lease-time">
                          <span class="time-label">Expires:</span>
                          <span class="time-value">{{ formatDateTime(lease.end_time) }}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      class="delete-button"
                      @click="revokeLease(lease.prefix)"
                      :disabled="revokingPrefix === lease.prefix"
                      title="Revoke lease"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Request New Prefix -->
              <div class="request-prefix-form">
                <h3>Request New Prefix</h3>
                <div class="form-group">
                  <label for="duration">Lease Duration (hours):</label>
                  <select
                    id="duration"
                    v-model="selectedDuration"
                    class="duration-select"
                    :disabled="requestingPrefix"
                  >
                    <option :value="1">1 hour</option>
                    <option :value="2">2 hours</option>
                    <option :value="4">4 hours</option>
                    <option :value="8">8 hours</option>
                    <option :value="12">12 hours</option>
                    <option :value="24">24 hours</option>
                  </select>
                </div>
                <button
                  class="request-button"
                  @click="requestPrefix"
                  :disabled="requestingPrefix || !userInfo?.asn"
                >
                  {{ requestingPrefix ? 'Requesting...' : 'Request Prefix' }}
                </button>
                <div v-if="!userInfo?.asn" class="alert alert-warning">
                  <p><strong>ASN Required:</strong> You need an ASN before requesting a prefix.</p>
                </div>
              </div>
            </div>
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
import { useAuth0 } from '@auth0/auth0-vue';
import { createApiClient } from '@/utils/api';

const auth0 = useAuth0();
const audience = import.meta.env.VITE_AUTH0_AUDIENCE || 'https://peerlab.nxthdr.dev';

// Create API client with automatic token refresh
const apiClient = createApiClient(auth0, audience);

// State
const loading = ref(true);
const error = ref<string | null>(null);
const asnLoading = ref(false);
const asnError = ref<string | null>(null);
const requestingAsn = ref(false);

// Prefix lease state
const selectedDuration = ref(4); // Default to 4 hours
const requestingPrefix = ref(false);
const prefixError = ref<string | null>(null);
const revokingPrefix = ref<string | null>(null); // Track which prefix is being revoked

interface UserInfo {
  user_hash: string;
  asn: number | null;
  max_leases: number | null;
  active_leases: Array<{
    prefix: string;
    start_time: string;
    end_time: string;
  }>;
}

const userInfo = ref<UserInfo | null>(null);

// Fetch user info from peerlab-gateway
const fetchUserInfo = async () => {
  asnLoading.value = true;
  asnError.value = null;

  try {
    const response = await apiClient.get('/api/peerlab/user/info');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    userInfo.value = data;

    // If user doesn't have an ASN, automatically request one
    if (!data.asn) {
      await requestAsn();
    }
  } catch (err) {
    console.error('Error fetching user info:', err);
    asnError.value = err instanceof Error ?
      err.message :
      'Unable to fetch peering information. Please try again later.';
    userInfo.value = null;
  } finally {
    asnLoading.value = false;
    loading.value = false;
  }
};

// Request ASN assignment
const requestAsn = async () => {
  requestingAsn.value = true;
  asnError.value = null;

  try {
    const response = await apiClient.post('/api/peerlab/user/asn');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Update user info with the new ASN
    if (userInfo.value) {
      userInfo.value.asn = data.asn;
    } else {
      // Fetch full user info if we don't have it
      await fetchUserInfo();
    }
  } catch (err) {
    console.error('Error requesting ASN:', err);
    asnError.value = err instanceof Error ?
      err.message :
      'Unable to request ASN. Please try again later.';
  } finally {
    requestingAsn.value = false;
  }
};

// Request prefix lease
const requestPrefix = async () => {
  requestingPrefix.value = true;
  prefixError.value = null;

  try {
    const response = await apiClient.post('/api/peerlab/user/prefix', {
      duration_hours: selectedDuration.value
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Refresh user info to show the new lease
    await fetchUserInfo();
  } catch (err) {
    console.error('Error requesting prefix:', err);
    prefixError.value = err instanceof Error ?
      err.message :
      'Unable to request prefix. Please try again later.';
  } finally {
    requestingPrefix.value = false;
  }
};

// Revoke prefix lease
const revokeLease = async (prefix: string) => {
  revokingPrefix.value = prefix;
  prefixError.value = null;

  try {
    const response = await apiClient.delete(`/api/peerlab/user/prefix/${encodeURIComponent(prefix)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Refresh user info to remove the revoked lease
    await fetchUserInfo();
  } catch (err) {
    console.error('Error revoking prefix:', err);
    prefixError.value = err instanceof Error ?
      err.message :
      'Unable to revoke prefix. Please try again later.';
  } finally {
    revokingPrefix.value = null;
  }
};

// Format date/time for display
const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

const retryFetch = () => {
  loading.value = true;
  error.value = null;
  fetchUserInfo();
};

onMounted(() => {
  fetchUserInfo();
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

/* ASN Section */
.section-container {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.section-container h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-heading);
}

.asn-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.asn-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 1rem;
}

.asn-label {
  font-weight: 600;
  color: var(--color-text);
}

.asn-value {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-accent);
}

.info-help {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
}

.info-loading {
  color: var(--color-text-muted);
  font-style: italic;
}

.info-error {
  color: #e53935;
  padding: 0.75rem;
  background-color: rgba(229, 57, 53, 0.1);
  border-radius: 4px;
}

.request-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.request-button:hover:not(:disabled) {
  background-color: #1976d2;
}

.request-button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

/* Prefix Lease Section */
.prefix-lease-content {
  color: var(--color-text);
}

.active-leases {
  margin-bottom: 2rem;
}

.active-leases h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.leases-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.lease-item {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.lease-content {
  flex: 1;
}

.lease-prefix {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.prefix-label {
  font-weight: 600;
  color: var(--color-text);
}

.prefix-value {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 1.1rem;
  color: var(--color-accent);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.lease-times {
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
}

.lease-time {
  display: flex;
  gap: 0.5rem;
}

.time-label {
  color: var(--color-text-muted);
}

.time-value {
  color: var(--color-text);
  font-weight: 500;
}

.request-prefix-form {
  margin-top: 1.5rem;
}

.request-prefix-form h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.duration-select {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.duration-select:hover:not(:disabled) {
  border-color: rgba(59, 130, 246, 0.5);
}

.duration-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-button {
  background-color: transparent;
  border: 1px solid rgba(229, 57, 53, 0.3);
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  color: #e53935;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.delete-button:hover:not(:disabled) {
  background-color: rgba(229, 57, 53, 0.1);
  border-color: rgba(229, 57, 53, 0.5);
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-button svg {
  display: block;
}
</style>
