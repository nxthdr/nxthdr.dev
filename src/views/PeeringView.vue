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
        <div v-else class="peering-page-content">
          <h1 class="peering-title">Peering</h1>
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

          <!-- Getting Started Section -->
          <div class="section-container">
            <h2>Getting Started</h2>
            <div class="getting-started-content">
              <p>To connect to PeerLab and start learning BGP:</p>
              <ol class="steps-list">
                <li>
                  <strong>Clone the PeerLab repository:</strong>
                  <pre><code>git clone https://github.com/nxthdr/peerlab.git
cd peerlab</code></pre>
                </li>
                <li>
                  <strong>Configure your environment:</strong>
                  <pre><code>cp .env.example .env
# Edit .env and set:
# USER_ASN={{ userInfo?.asn || 'YOUR_ASN' }}
# USER_PREFIXES=  # Leave empty for receive-only mode</code></pre>
                </li>
                <li>
                  <strong>Start PeerLab:</strong>
                  <pre><code>make setup
# In another terminal:
make auth
# Follow the authentication URL
make up</code></pre>
                </li>
                <li>
                  <strong>Check BGP status:</strong>
                  <pre><code>make status</code></pre>
                </li>
              </ol>
              <p class="help-text">
                For detailed instructions, see the <a href="https://github.com/nxthdr/peerlab" target="_blank" rel="noopener noreferrer" class="docs-link">PeerLab documentation</a>.
              </p>
            </div>
          </div>

          <!-- Future: Prefix Leases Section -->
          <!-- This will be implemented in a second phase -->
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
import { useLogto } from '@logto/vue';
import { createApiClient } from '@/utils/api';

const logto = useLogto();
const resourceUrl = import.meta.env.VITE_LOGTO_RESOURCE_URL || 'https://peerlab.nxthdr.dev';

// Create API client with automatic token refresh
const apiClient = createApiClient(logto, resourceUrl);

// State
const loading = ref(true);
const error = ref<string | null>(null);
const asnLoading = ref(false);
const asnError = ref<string | null>(null);
const requestingAsn = ref(false);

interface UserInfo {
  user_hash: string;
  asn: number | null;
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

/* Getting Started Section */
.getting-started-content {
  color: var(--color-text);
}

.getting-started-content p {
  margin-bottom: 1rem;
}

.steps-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.steps-list li {
  margin-bottom: 1.5rem;
}

.steps-list li strong {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.steps-list pre {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 0.75rem;
  overflow-x: auto;
  margin: 0.5rem 0;
}

.steps-list code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--color-accent);
}

.help-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
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
</style>
