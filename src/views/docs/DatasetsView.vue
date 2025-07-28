<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Datasets</h1>
    <p class="docs-subtitle">Freely accessible data collected by anyone for everyone</p>

    <div class="section-container">
      <p>
        Our datasets are freely accessible to researchers, students, network operators, and anyone interested in studying Internet infrastructure.
        The data is served through a ClickHouse HTTP proxy, making it easy to query from any programming language or analysis tool.
      </p>
      <div class="alert alert-info">
        <p>These datasets are made available under the <strong>Public Domain Dedication and License v1.0</strong> whose full text can be found at: <a href="http://opendatacommons.org/licenses/pddl/1.0/" target="_blank" rel="noopener">http://opendatacommons.org/licenses/pddl/1.0/</a>.</p>
      </div>

      <h3>Access & Authentication</h3>
      <p>
        To access the data, use basic HTTP authentication with the following public credentials:
      </p>
      <p>
        <strong>Endpoint:</strong> <code>{{ baseUrl }}/api/query/</code><br>
        <strong>Username:</strong> <code>read</code><br>
        <strong>Password:</strong> <code>read</code>
      </p>
      <p>
        These credentials are intentionally public and can be freely shared.
        Authentication exists solely to prevent automated scraping while allowing legitimate access.
      </p>

      <h3>How to Use</h3>
      <p>
        You can query the datasets using:
      </p>
      <ul>
        <li><strong>Command line:</strong> curl with SQL queries (examples below)</li>
        <li><strong>ClickHouse client:</strong> Official CLI tool with native protocol</li>
        <li><strong>Programming languages:</strong> HTTP libraries in Python, R, JavaScript, etc.</li>
        <li><strong>Analytics platforms:</strong> Jupyter notebooks, R Studio, or custom applications</li>
      </ul>
      <p>
        All queries must be compatible with <a href="https://clickhouse.com/" target="_blank" rel="noopener">ClickHouse SQL</a>.
        See the examples below for each dataset to get started.
      </p>
    </div>

    <h2 class="subheading">Probing Dataset</h2>

    <div class="section-container">
      <p>
        The probing dataset is available in the <code>saimiris.replies</code> table.
        Active measurements using <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a>, whether scheduled via cron jobs or performed on demand by the users, are stored in a ClickHouse database.
        This data consists of traceroute-like and ping-like measurement results collected from multiple vantage points.
      </p>
      <p>
        Each row corresponds to a measurement result, capturing the source and destination IP addresses of the sent packet, the reply, the hop count, and other relevant attributes.
        This dataset is ideal for network topology discovery, latency analysis, and path characterization.
      </p>

      <h3 class="schema-heading">Key Schema Fields</h3>
      <div class="schema-details">
        <div class="schema-field">
          <code>time_received_ns</code> <span class="field-type">DateTime64(9)</span>
          <p>Timestamp when the reply was received (nanosecond precision)</p>
        </div>
        <div class="schema-field">
          <code>agent_id</code> <span class="field-type">String</span>
          <p>Identifier of the measurement agent/vantage point (e.g., 'vltcdg01', 'vltatl01')</p>
        </div>
        <div class="schema-field">
          <code>probe_src_addr</code> / <code>probe_dst_addr</code> <span class="field-type">IPv6</span>
          <p>Source and destination addresses of the probe packet</p>
        </div>
        <div class="schema-field">
          <code>reply_src_addr</code> / <code>reply_dst_addr</code> <span class="field-type">IPv6</span>
          <p>Source and destination addresses of the reply packet</p>
        </div>
        <div class="schema-field">
          <code>probe_ttl</code> / <code>reply_ttl</code> <span class="field-type">UInt8</span>
          <p>TTL of the probe and reply packets (for hop-by-hop analysis)</p>
        </div>
        <div class="schema-field">
          <code>rtt</code> <span class="field-type">UInt16</span>
          <p>Round-trip time in microseconds</p>
        </div>
      </div>

      <h3 class="example-heading">Example Query</h3>
      <p>Find the top 10 destinations with the highest average RTT from the CDG agent in the last hour:</p>
      <CopyableCodeBlock
        :code="probingExampleQuery"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
      />

      <p class="schema-link">
        <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/saimiris/saimiris.sql" target="_blank" rel="noopener">View complete schema →</a>
      </p>
    </div>

    <h2 class="subheading">Peering Dataset</h2>

    <div class="section-container">
      <p>
        The peering dataset is available in the <code>bmp.updates</code> table.
        Each router of as215011, including those inside IXPs, sends BMP messages to <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a>, which records the updates in a ClickHouse database.
      </p>
      <p>
        Each row corresponds to an update or a withdraw, capturing prefixes, AS paths, communities, and other attributes.
        This dataset is perfect for analyzing BGP routing dynamics, prefix announcements, and AS relationship studies.
      </p>

      <h3 class="schema-heading">Key Schema Fields</h3>
      <div class="schema-details">
        <div class="schema-field">
          <code>time_received_ns</code> <span class="field-type">DateTime64(9)</span>
          <p>Timestamp when the BGP update was received</p>
        </div>
        <div class="schema-field">
          <code>router_addr</code> / <code>peer_addr</code> <span class="field-type">IPv6</span>
          <p>Router and peer IP addresses</p>
        </div>
        <div class="schema-field">
          <code>peer_asn</code> <span class="field-type">UInt32</span>
          <p>Autonomous System Number of the BGP peer</p>
        </div>
        <div class="schema-field">
          <code>prefix_addr</code> / <code>prefix_len</code> <span class="field-type">IPv6 / UInt8</span>
          <p>IP prefix and its length being announced or withdrawn</p>
        </div>
        <div class="schema-field">
          <code>announced</code> <span class="field-type">bool</span>
          <p>Whether the prefix is being announced (true) or withdrawn (false)</p>
        </div>
        <div class="schema-field">
          <code>path</code> <span class="field-type">Array(UInt32)</span>
          <p>AS path for the prefix announcement</p>
        </div>
        <div class="schema-field">
          <code>communities</code> <span class="field-type">Array(Tuple(UInt32, UInt16))</span>
          <p>BGP communities attached to the prefix</p>
        </div>
      </div>

      <h3 class="example-heading">Example Query</h3>
      <p>Find prefixes with the most BGP communities in the last 24 hours:</p>
      <CopyableCodeBlock
        :code="peeringExampleQuery"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
      />

      <p class="schema-link">
        <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/bmp/bmp.sql" target="_blank" rel="noopener">View complete schema →</a>
      </p>
    </div>

    <h2 class="subheading">Traffic Dataset</h2>

    <div class="section-container">
      <p>
        The traffic dataset is available in the <code>flows.records</code> table.
        Each router of as215011 sends sFlow messages to <a href="https://github.com/netsampler/goflow2" target="_blank" rel="noopener">goflow2</a>, which records the flow samples in a ClickHouse database.
      </p>
      <p>
        Each row represents a sampled network flow, capturing traffic statistics between source and destination endpoints.
        This dataset is more useful for internal troubleshooting, but is public for transparency and possible research use cases.
      </p>

      <h3 class="schema-heading">Key Schema Fields</h3>
      <div class="schema-details">
        <div class="schema-field">
          <code>time_flow_start_ns</code> <span class="field-type">DateTime64(9)</span>
          <p>Timestamp when the flow started</p>
        </div>
        <div class="schema-field">
          <code>src_addr</code> / <code>dst_addr</code> <span class="field-type">IPv6</span>
          <p>Source and destination IP addresses</p>
        </div>
        <div class="schema-field">
          <code>src_as</code> / <code>dst_as</code> <span class="field-type">UInt32</span>
          <p>Source and destination Autonomous System Numbers</p>
        </div>
        <div class="schema-field">
          <code>src_port</code> / <code>dst_port</code> <span class="field-type">UInt32</span>
          <p>Source and destination port numbers</p>
        </div>
        <div class="schema-field">
          <code>proto</code> <span class="field-type">UInt32</span>
          <p>IP protocol number (6=TCP, 17=UDP, etc.)</p>
        </div>
        <div class="schema-field">
          <code>bytes</code> / <code>packets</code> <span class="field-type">UInt64</span>
          <p>Number of bytes and packets in the flow</p>
        </div>
        <div class="schema-field">
          <code>sampling_rate</code> <span class="field-type">UInt64</span>
          <p>sFlow sampling rate (multiply by this to estimate actual traffic)</p>
        </div>
      </div>

      <h3 class="example-heading">Example Query</h3>
      <p>Find the top 10 destination IP addresses by average bandwidth in the last 24 hours:</p>
      <CopyableCodeBlock
        :code="trafficExampleQuery"
        :executable="true"
        :collapsible="true"
        :default-collapsed="false"
      />

      <p class="schema-link">
        <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/flows/flows.sql" target="_blank" rel="noopener">View complete schema →</a>
      </p>
    </div>

    <DocsNavigation />
  </div>
</template>

<script setup lang="ts">
import CopyableCodeBlock from '@/components/CopyableCodeBlock.vue';
import DocsNavigation from '@/components/DocsNavigation.vue';

const baseUrl = import.meta.env.VITE_BASE_URL || 'https://nxthdr.dev';

const probingExampleQuery = `curl -X POST "${baseUrl}/api/query/" \\
  -u "read:read" \\
  -H "Content-Type: text/plain" \\
  -d "SELECT probe_dst_addr,
       count(*) as measurements,
       round(avg(rtt), 2) as avg_rtt_us
FROM saimiris.replies
WHERE time_received_ns >= now() - INTERVAL 1 HOUR
  AND agent_id = 'vltcdg01'
GROUP BY probe_dst_addr
ORDER BY avg_rtt_us DESC
LIMIT 10 FORMAT CSVWithNames"`;

const peeringExampleQuery = `curl -X POST "${baseUrl}/api/query/" \\
  -u "read:read" \\
  -H "Content-Type: text/plain" \\
  -d "WITH concat(prefix_addr, '/', prefix_len) AS prefix
SELECT prefix,
       max(length(communities)) AS n_communities
FROM bmp.updates
WHERE time_received_ns >= now() - INTERVAL 1 DAY
GROUP BY prefix
ORDER BY n_communities DESC
LIMIT 5 FORMAT CSVWithNames"`;

const trafficExampleQuery = `curl -X POST "${baseUrl}/api/query/" \\
  -u "read:read" \\
  -H "Content-Type: text/plain" \\
  -d "SELECT
  dst_addr,
  sum(bytes * sampling_rate) / (24 * 3600) as avg_bytes_per_second,
  count(*) as flow_records,
  sum(bytes * sampling_rate) as total_estimated_bytes
FROM flows.records
WHERE time_flow_start_ns >= now() - INTERVAL 1 DAY
GROUP BY dst_addr
ORDER BY avg_bytes_per_second DESC
LIMIT 10 FORMAT CSVWithNames"`;
</script>
