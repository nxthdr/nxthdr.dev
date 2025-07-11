<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Saimiris</h1>
    <p class="docs-subtitle">High-performance internet measurement platform</p>

    <div class="section-container">
      <p>
        <strong>Saimiris</strong> is the measurement pipeline powering the <strong>nxthdr</strong> probing platform. Written in Rust, it provides a scalable and efficient solution for conducting active internet measurements across multiple vantage points.
      </p>
      <p>
        The platform is designed to handle large-scale measurement campaigns while maintaining high performance and reliability. Saimiris agents are deployed on probing servers worldwide, and the Saimiris Gateway API allows to easily interact with the agents.
      </p>
      <p>
        Saimiris agents are deployed globally on our probing <router-link to="/docs/infrastructure">infrastructure</router-link> using the <router-link to="/docs/as215011">as215011</router-link> network. This allows measurements to be performed from addresses controlled by our autonomous system.
      </p>
    </div>

    <h2 class="subheading">Get started</h2>
    <div class="section-container">
      <p v-if="!isAuthenticated">
        The very first step is to register yourself on the nxthdr platform. Once done, you should be able to access to your <router-link to="/dashboard">dashboard</router-link>.
      </p>
      <p>
        On your <router-link to="/dashboard">dashboard</router-link>, you will see how many probes credits you have available for the day. Currenly, each user is allocated <code>10000</code> credits per day, which allows you to send <code>10000</code> individual probes. Please <a href="mailto:admin@nxthdr.dev">contact us</a> if you need more.
      </p>
      <p>
        Also, you will find your <strong>Access Token</strong>. This token is necessary to authenticate your requests to the Saimiris Gateway API. You can use it to send measurements from your own scripts or applications. We are planning to provide a CLI tool to simplify this process in the future, but for now, you can use tools like <code>curl</code> or <code>httpie</code> to interact with the API directly.
      </p>

      <h3 class="section-title">Verify your token</h3>
      <p>
        To verify that your token is working correctly, you can check your available credits with this simple request:
      </p>
      <CopyableCodeBlock :code="verifyTokenCommand" />
      <p v-if="!isAuthenticated || !userToken">
        Replace <code>YOUR_ACCESS_TOKEN</code> with the actual token from your dashboard. This will return your current credit balance and daily limit.
      </p>
      <p v-else>
        This example uses your actual access token. It will return your current credit balance and daily limit.
      </p>

      <h3 class="section-title">Check your available agents</h3>
      <p>
        Before sending probes, you need to know which agents are available to you and their corresponding source IP prefixes. Each user is allocated a /80 IPv6 source prefix for each agent, and you can query your available prefixes with this request:
      </p>
      <CopyableCodeBlock :code="fetchPrefixesCommand" />
      <p v-if="!isAuthenticated || !userToken">
        Replace <code>YOUR_ACCESS_TOKEN</code> with your actual token. This will return a list of agents available to you, along with their IDs and your allocated IPv6 prefixes.
      </p>
      <p v-else>
        This example uses your actual access token and will show your allocated agents and IPv6 prefixes.
      </p>
      <p>
        The response will show each agent with its ID and the IPv6 source prefixes allocated to you. You'll need to use one of these agent IDs and an IP address from your allocated prefix when sending probes.
      </p>

      <h3 class="section-title">Send your first probes</h3>
      <p>
        Once your token is verified, you can send some test probes to see the system in action. You can check the available agents and their IP addresses on your <router-link to="/dashboard">dashboard</router-link>. Here's an example that sends 4 probes to popular DNS servers:
      </p>
      <CopyableCodeBlock :code="sendProbesCommand" />
      <p v-if="!isAuthenticated || !userToken || !userPrefixes">
        This will send 4 probes (2 ICMP and 2 UDP) to Cloudflare and Google's IPv6 DNS servers. Replace <code>YOUR_ACCESS_TOKEN</code> with your actual token and <code>vltcdg01</code>/<code>2a0e:97c0:8a0::50</code> with an actual agent ID and IP address from your dashboard. The <code>"ip_address"</code> field is required and must specify the exact agent IP address you want to use for the measurement.
      </p>
      <p v-else>
        This will send 4 probes (2 ICMP and 2 UDP) to Cloudflare and Google's IPv6 DNS servers using your actual access token and a real agent from your allocated prefix. The <code>"ip_address"</code> field specifies the exact agent source IP address for the measurement.
      </p>
      <p>
        The API will return a confirmation that your probes have been accepted for processing. After running this command, go back to your <router-link to="/dashboard">dashboard</router-link> and refresh the page - you should see that your used credits have increased by 4.
      </p>

      <h3 class="section-title">Retrieve measurement results</h3>
      <p>
        Once your probes have been executed, you can query the replies after few seconds or minutes using the source IP address you specified in the metadata. The replies are stored in our ClickHouse database and can be accessed using the same public credentials as our other <router-link to="/docs/datasets">datasets</router-link>:
      </p>
      <CopyableCodeBlock :code="retrieveResultsCommand" />
      <p v-if="!isAuthenticated || !userToken || !userPrefixes">
        Replace <code>2a0e:97c0:8a0::50</code> with the actual IP address you used in your probe request metadata. The <code>time_received_ns</code> filter helps narrow down results to recent measurements.
      </p>
      <p v-else>
        This example uses the same agent source IP address from the probe example above. The <code>time_received_ns</code> filter helps narrow down results to recent measurements.
      </p>
      <p>
        <strong>Important note:</strong> all measurements data collected by Saimiris is made freely available for everyone, without registration.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLogto } from '@logto/vue';
import CopyableCodeBlock from '@/components/CopyableCodeBlock.vue';

const { isAuthenticated, getAccessToken } = useLogto();

// User data
const userToken = ref<string | null>(null);
const userPrefixes = ref<any | null>(null);
const resourceUrl = import.meta.env.VITE_LOGTO_RESOURCE_URL || 'https://saimiris.nxthdr.dev';

// Fetch user token and prefixes
const fetchUserData = async () => {
  if (!isAuthenticated.value) return;

  try {
    const token = await getAccessToken(resourceUrl);
    userToken.value = token || null;

    if (token) {
      // Fetch user prefixes
      const response = await fetch('/api/saimiris/user/prefixes', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

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
  return `curl -s https://saimiris.nxthdr.dev/api/user/me \\
     -H 'Content-Type: application/json' \\
     -H 'Authorization: Bearer ${token}'`;
});

const fetchPrefixesCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  return `curl -s https://saimiris.nxthdr.dev/api/user/prefixes \\
     -H 'Content-Type: application/json' \\
     -H 'Authorization: Bearer ${token}'`;
});

const sendProbesCommand = computed(() => {
  // Always show dummy token if not authenticated or no token available
  const token = (isAuthenticated.value && userToken.value) ? userToken.value : 'YOUR_ACCESS_TOKEN';
  const agent = exampleAgent.value;

  return `curl -s -X POST "https://saimiris.nxthdr.dev/api/probes" \\
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

const retrieveResultsCommand = computed(() => {
  const agent = exampleAgent.value;

  return `echo """
    SELECT
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
    FORMAT Pretty
    """ | curl 'https://clickhouse.nxthdr.dev/?user=read&password=read' \\
        --data-binary @-`;
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
</style>
