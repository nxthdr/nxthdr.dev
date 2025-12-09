<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="docs-page-content">
        <h1 class="docs-title">Measurements</h1>
        <p class="docs-subtitle">High-performance Internet measurements platform</p>

        <div class="section-container">
          <p>
            <strong>Saimiris</strong> is the measurement pipeline powering the <strong>nxthdr</strong> probing platform.
            Written in Rust, it provides a scalable and efficient solution for conducting active internet measurements across multiple vantage points.
          </p>
          <p>
            The platform is designed to handle large-scale measurement campaigns while maintaining high performance and reliability.
            Saimiris agents are deployed on probing servers worldwide, and the Saimiris Gateway allows to easily interact with the agents.
          </p>
          <p>
            Saimiris agents are deployed globally on our probing infrastructure.
            This allows measurements to be performed from addresses controlled by our autonomous system.
          </p>
        </div>

        <div v-if="!isAuthenticated" class="alert alert-info">
           <strong><button @click="handleLogin" class="link-style">Sign up</button></strong> to get examples with your actual token and own prefixes.
        </div>

        <h2 class="subheading">Getting started</h2>
        <div class="section-container">
          <p>
            On your <router-link to="/dashboard">dashboard</router-link>, you will see how many probe credits you have available for the day.
            Currently, each user is allocated <code>10,000</code> credits per day, which allows you to send <code>10,000</code> individual probes.
            Please <a href="mailto:admin@nxthdr.dev">contact us</a> if you need more.
          </p>
          <p>
            You will also find your <strong>Access Token</strong> on the dashboard.
            This token is necessary to authenticate your requests to the Saimiris Gateway.
          </p>
          <p>
            You can use your token to send measurements from your own scripts, notebooks or applications.
            We are planning to provide a CLI tool to simplify this process in the future, but for now, you can use tools like <code>curl</code> or <code>httpie</code> to interact with the API directly.
          </p>

          <h3 class="section-title">Check your available agents</h3>
          <p>
            Before sending probes, you need to know which agents are available to you and their corresponding source IP prefixes.
            Each user is allocated a /80 IPv6 source prefix for each agent, and you can query your available prefixes with this request:
          </p>
          <CopyableCodeBlock
            :code="fetchPrefixesCommand"
            :executable="true"
            :collapsible="true"
            :default-collapsed="false"
      />
      <p v-if="!isAuthenticated || !userToken">
        Replace <code>YOUR_ACCESS_TOKEN</code> with your actual token. This will return a list of agents available to you, along with their IDs and your allocated IPv6 prefixes.
      </p>
      <p v-else>
        This example uses your actual access token and will show your allocated agents and IPv6 prefixes.
      </p>
      <p>
        The response will show each agent with its ID and the IPv6 source prefixes allocated to you.
        You'll need to use one of these agent IDs and an IP address from your allocated prefix when sending probes.
      </p>

      <h3 class="section-title">Understanding probes</h3>
      <p>
        A <strong>probe</strong> is a network packet sent from a measurement agent to a target destination to test connectivity, measure latency, or trace network paths.
        Saimiris follows the <a href="https://dioptra-io.github.io/caracal/usage/" target="_blank" rel="noopener">Caracal probe specification</a>, which defines a standardized format for network measurement probes.
      </p>
      <div class="callout">
        <p><strong>Important:</strong> At the moment, we don't support IPv4 probes, since we only operate on IPv6 prefixes.</p>
      </div>
      <p>
        Each probe is defined by five parameters that specify exactly how the network packet should be constructed and sent:
      </p>
      <ul>
        <li><strong>destination address</strong>: The destination address, which can be an IPv4-mapped IPv6 address (e.g., <code>::ffff:8.8.8.8</code>) or an IPv6 address (e.g., <code>2001:4860:4860::8888</code>)</li>
        <li><strong>source port</strong>: Source port number (0-65535). For UDP probes, this is encoded in the UDP header. For ICMP probes, it's encoded in the ICMP checksum to vary the flow-id</li>
        <li><strong>destination port</strong>: Destination port number (0-65535), encoded directly in the UDP header for UDP probes</li>
        <li><strong>TTL</strong>: Time-to-Live value, which limits how many network hops the packet can traverse before being discarded</li>
        <li><strong>protocol</strong>: The protocol type, which can be <code>icmpv6</code>, or <code>udp</code></li>
      </ul>

      <h3 class="section-title">Send your first probes</h3>
      <p>
        Let's send some probes to see the system in action.
        You can check the available agents and their IP addresses on your <router-link to="/dashboard">dashboard</router-link>.
        Here's an example that sends 4 probes from as215011:
      </p>
      <CopyableCodeBlock
        :code="sendProbesCommand"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
        @execution-complete="handleProbeExecution"
      />
      <p v-if="!isAuthenticated || !userToken || !userPrefixes">
        This example demonstrates the Caracal probe format by sending 4 network probes to popular DNS servers from one of our probing agents.
        The probes target Cloudflare (<code>2606:4700:4700::1111</code> and <code>2606:4700:4700::1001</code>) and Google (<code>2001:4860:4860::8888</code> and <code>2001:4860:4860::8844</code>) using both ICMPv6 and UDP protocols.
        Replace <code>YOUR_ACCESS_TOKEN</code> with your dashboard token and update the agent details (<code>vltcdg01</code> and <code>2a0e:97c0:8a0::50</code>) with values from your dashboard.
      </p>
      <p v-else>
        This example demonstrates the Caracal probe format by sending 4 network probes to popular DNS servers from one of our probing agents.
        The probes target Cloudflare (<code>2606:4700:4700::1111</code> and <code>2606:4700:4700::1001</code>) and Google (<code>2001:4860:4860::8888</code> and <code>2001:4860:4860::8844</code>) using both ICMPv6 and UDP protocols.
        The command uses your actual access token and agent details automatically.
      </p>
      <p>
        The API will return a confirmation that your probes have been accepted for processing.
        The measurement ID will be included in the response, which you can use to check the status of your measurement.
      </p>

      <h3 class="section-title">Check measurement status</h3>
      <p>
        Before retrieving the actual measurement results, you can check the status of your measurement using the measurement ID returned from the previous command.
        <span v-if="!measurementId">After running the probe command above, the measurement ID will be automatically extracted and used in this command.</span>
      </p>
      <CopyableCodeBlock
        :code="checkStatusCommand"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
      />
      <p v-if="!isAuthenticated || !userToken">
        <span v-if="measurementId">This command uses the measurement ID <code>{{ measurementId }}</code> that was extracted from your probe submission.</span>
        <span v-else>Replace <code>YOUR_ACCESS_TOKEN</code> with your actual token. The measurement ID will be automatically filled when you run the probe command above.</span>
        This will show you the current status of your measurement and whether the probes have been executed.
      </p>
      <p v-else>
        <span v-if="measurementId">This example uses your actual access token and the measurement ID <code>{{ measurementId }}</code> from your probe submission.</span>
        The status endpoint will show you whether your measurement has been completed and is ready for data retrieval.
      </p>

      <h3 class="section-title">Retrieve measurement results</h3>
      <div class="alert alert-warning">
        <strong>Important note</strong> All measurements data collected by Saimiris is made freely available for everyone, without registration.
        However, there is no way to know which user sent which probes since we don't store any user identifiers with the measurement results.
      </div>
      <p>
        Once your probes have been executed, you can query the replies after few seconds or minutes using the source IP address you specified in the metadata.
        The replies are stored in our ClickHouse database and can be accessed using the same public credentials as our other <router-link to="/docs/datasets">datasets</router-link>:
      </p>
      <CopyableCodeBlock
        :code="retrieveResultsCommand"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
      />
      <p v-if="!isAuthenticated || !userToken || !userPrefixes">
        Replace <code>2a0e:97c0:8a0::50</code> with the actual IP address you used in your probe request metadata.
        The <code>time_received_ns</code> filter helps narrow down results to recent measurements.
      </p>
      <p v-else>
        This example uses the same agent source IP address from the probe example above.
        Use the source IP address you specified in the metadata to retrieve the corresponding replies.
        The <code>time_received_ns</code> filter helps narrow down results to recent measurements.
      </p>
      <p>
        Finally, you can go back to your <router-link to="/dashboard">dashboard</router-link> and refresh the page: you should see that your used credits have increased by 4.
      </p>
    </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLogto } from '@logto/vue';
import { createApiClient } from '@/utils/api';
import CopyableCodeBlock from '@/components/CopyableCodeBlock.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const logto = useLogto();
const { isAuthenticated, getAccessToken, signIn } = logto;

// User data
const userToken = ref<string | null>(null);
const userPrefixes = ref<any | null>(null);
const measurementId = ref<string | null>(null);
const resourceUrl = import.meta.env.VITE_LOGTO_RESOURCE_URL || 'https://saimiris.nxthdr.dev';
const baseUrl = import.meta.env.VITE_BASE_URL || 'https://nxthdr.dev';

// Create API client with automatic token refresh
const apiClient = createApiClient(logto, resourceUrl);

// Handle login
function handleLogin() {
  signIn(window.location.origin + '/callback');
}

// Handle probe execution completion
function handleProbeExecution(result: { output: string; error: string | null; success: boolean }) {
  if (result.success && result.output) {
    try {
      const response = JSON.parse(result.output);
      if (response.id) {
        measurementId.value = response.id;
      }
    } catch (error) {
      console.error('Failed to parse probe response:', error);
    }
  }
}

// Fetch user token and prefixes
const fetchUserData = async () => {
  if (!isAuthenticated.value) return;

  try {
    const token = await getAccessToken(resourceUrl);
    userToken.value = token || null;

    if (token) {
      // Fetch user prefixes using API client with automatic token refresh
      const response = await apiClient.get('/api/saimiris/user/prefixes');

      if (response.ok) {
        userPrefixes.value = await response.json();
      } else {
        // API call failed, keep userPrefixes as null to show dummy values
        console.warn('Failed to fetch user prefixes:', response.status, response.statusText);
        userPrefixes.value = null;
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);

    // Check if this is a session expiration error
    if (error instanceof Error && (
      error.message.includes('invalid_grant') ||
      error.message.includes('grant request is invalid') ||
      error.message.includes('Session expired')
    )) {
      // Session expired, sign out and redirect to home
      await logto.signOut(window.location.origin);
      return;
    }

    // Reset both values on error to ensure dummy values are shown
    userToken.value = null;
    userPrefixes.value = null;
  }
};

// Get the first available agent and IP for examples
const exampleAgent = computed(() => {
  // Always return dummy values if not authenticated or no user data
  if (!isAuthenticated.value || !userToken.value || !userPrefixes.value?.agents?.length) {
    return {
      id: 'vltcdg01',
      ip: '2a0e:97c0:8a0::50'
    };
  }

  const firstAgent = userPrefixes.value.agents[0];
  const firstPrefix = firstAgent.prefixes?.[0];

  // Return dummy values if no valid prefix found
  if (!firstPrefix || !firstAgent.agent_id) {
    return {
      id: 'vltcdg01',
      ip: '2a0e:97c0:8a0::50'
    };
  }

  // Extract the network address from the user's /80 prefix and increment it
  const userPrefixAddr = firstPrefix.user_prefix.split('/')[0];

  // Convert IPv6 address to BigInt, add 1, then convert back
  const ipv6ToBigInt = (ip: string): bigint => {
    // Expand the IPv6 address to full form first
    const expandedParts = [];
    const parts = ip.split('::');

    if (parts.length === 2) {
      // Handle compressed form
      const leftParts = parts[0] ? parts[0].split(':') : [];
      const rightParts = parts[1] ? parts[1].split(':') : [];
      const missingParts = 8 - leftParts.length - rightParts.length;

      expandedParts.push(...leftParts);
      for (let i = 0; i < missingParts; i++) {
        expandedParts.push('0');
      }
      expandedParts.push(...rightParts);
    } else {
      expandedParts.push(...ip.split(':'));
    }

    // Ensure we have exactly 8 parts, pad with zeros if needed
    while (expandedParts.length < 8) {
      expandedParts.push('0');
    }

    let result = 0n;
    for (const part of expandedParts) {
      result = (result << 16n) + BigInt(parseInt(part || '0', 16));
    }
    return result;
  };

  const bigIntToIpv6 = (num: bigint): string => {
    const parts: string[] = [];
    for (let i = 0; i < 8; i++) {
      parts.unshift((num & 0xFFFFn).toString(16));
      num >>= 16n;
    }

    // Remove leading zeros from each part
    const cleanParts = parts.map(part => part.replace(/^0+/, '') || '0');

    // Find the longest sequence of consecutive zeros to compress
    let bestStart = -1;
    let bestLength = 0;
    let currentStart = -1;
    let currentLength = 0;

    for (let i = 0; i < cleanParts.length; i++) {
      if (cleanParts[i] === '0') {
        if (currentStart === -1) {
          currentStart = i;
          currentLength = 1;
        } else {
          currentLength++;
        }
      } else {
        if (currentLength > bestLength && currentLength > 1) {
          bestStart = currentStart;
          bestLength = currentLength;
        }
        currentStart = -1;
        currentLength = 0;
      }
    }

    // Check if the last sequence is the best
    if (currentLength > bestLength && currentLength > 1) {
      bestStart = currentStart;
      bestLength = currentLength;
    }

    // Build the final IPv6 string
    if (bestStart !== -1) {
      const beforeCompression = cleanParts.slice(0, bestStart).join(':');
      const afterCompression = cleanParts.slice(bestStart + bestLength).join(':');

      if (beforeCompression && afterCompression) {
        return beforeCompression + '::' + afterCompression;
      } else if (beforeCompression) {
        return beforeCompression + '::';
      } else if (afterCompression) {
        return '::' + afterCompression;
      } else {
        return '::';
      }
    }

    return cleanParts.join(':');
  };

  const networkBigInt = ipv6ToBigInt(userPrefixAddr);
  const nextIp = bigIntToIpv6(networkBigInt + 1n);

  return {
    id: firstAgent.agent_id,
    ip: nextIp
  };
});

// Dynamic code snippets
const verifyTokenCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  return `curl -s ${baseUrl}/api/saimiris/user/me \\
     -H 'Content-Type: application/json' \\
     -H 'Authorization: Bearer ${token}'`;
});

const fetchPrefixesCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  return `curl -s ${baseUrl}/api/saimiris/user/prefixes \\
     -H 'Content-Type: application/json' \\
     -H 'Authorization: Bearer ${token}'`;
});

const sendProbesCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  const agent = exampleAgent.value;

  return `curl -s -X POST "${baseUrl}/api/saimiris/probes" \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer ${token}" \\
     -d '{
         "metadata": [
             {
                 "id": "${agent.id}",
                 "ip_address": "${agent.ip}"
             }
         ],
         "probes": [
             ["2606:4700:4700::1111", 24000, 33434, 30, "icmpv6"],
             ["2606:4700:4700::1001", 24000, 33434, 30, "udp"],
             ["2001:4860:4860::8888", 24000, 33434, 30, "icmpv6"],
             ["2001:4860:4860::8844", 24000, 33434, 30, "udp"]
         ]
     }'`;
});

const checkStatusCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  const id = measurementId.value || 'MEASUREMENT_ID';

  return `curl -s "${baseUrl}/api/saimiris/measurement/${id}/status" \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer ${token}"`;
});

const retrieveResultsCommand = computed(() => {
  const agent = exampleAgent.value;

  return `curl -X POST "${baseUrl}/api/query/" \\
  -u "read:read" \\
  -H "Content-Type: text/plain" \\
  -d "SELECT
      probe_src_addr,
      probe_dst_addr,
      probe_protocol,
      probe_ttl,
      reply_src_addr
    FROM saimiris.replies
    WHERE
      time_received_ns >= now() - INTERVAL 1 HOUR
      AND probe_src_addr = toIPv6('${agent.ip}')
    ORDER BY time_received_ns DESC
    FORMAT CSVWithNames"`;
});

// Fetch data when component mounts or auth status changes
onMounted(() => {
  if (isAuthenticated.value) {
    fetchUserData();
  }
});

// Watch for auth changes
const { isAuthenticated: authWatcher } = useLogto();
const unwatchAuth = authWatcher.value ? null : () => {};
if (authWatcher && typeof authWatcher === 'object' && 'value' in authWatcher) {
  // Re-fetch when authentication status changes
  const checkAuth = () => {
    if (isAuthenticated.value && !userToken.value) {
      fetchUserData();
    }
  };
  setTimeout(checkAuth, 1000); // Check after a delay to ensure auth is stable
}
</script>

<style scoped>
.section-title {
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
}

ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.alert.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}
</style>
