<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Datasets</h1>
    <p class="docs-subtitle">Freely accessible data collected by the nxthdr platform</p>

    <div class="section-container">
      <p>
        The datasets are accessible from ClickHouse using our HTTP proxy. In the future, we might offer other ways to access the data.
      </p>
      <div class="callout">
        <p>All data produced by <strong>nxthdr</strong> and <strong>as215011</strong> are publicly available and freely usable under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener">Open Data Commons Open Database License (ODbL)</a>.</p>
      </div>
      <p>Here is a working example you can try in your terminal:</p>
      <CopyableCodeBlock :code="exampleQuery" />
      <pre class="code-block">
   ┏━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┓
   ┃ PREFIX             ┃ n_communities ┃
   ┡━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━┩
1. │ 2804:3018::/32     │           107 │
   ├────────────────────┼───────────────┤
2. │ 2804:c70:2000::/36 │           105 │
   ├────────────────────┼───────────────┤
3. │ 2804:c70:1000::/36 │           105 │
   ├────────────────────┼───────────────┤
4. │ 2804:42e0::/32     │           105 │
   ├────────────────────┼───────────────┤
5. │ 2804:c70:3000::/36 │           105 │
   └────────────────────┴───────────────┘</pre>
      <p>
        We use a basic username/password authentication to access the data. This is solely to prevent automated scraping, but the credentials are public and can be freely shared.
      </p>
      <p>
        user: <code>read</code><br>
        password: <code>read</code>
      </p>
    </div>

    <h2 class="subheading">Raw Probing Dataset</h2>

    <div class="section-container">
      <p>
        The raw probing dataset is available in the <code>saimiris.results</code> table. The schema is described in our <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/saimiris/saimiris.sql" target="_blank" rel="noopener">infrastructure</a> repository.
      </p>
      <p>
        Active measurements using <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a>, whether scheduled via cron jobs or performed on demand, are stored in a ClickHouse database. This data consists of traceroute-like and ping-like measurement results collected from multiple vantage points.
      </p>
      <p>
        Each row corresponds to a measurement result, capturing the source and destination IP addresses of the sent packet, the reply, the hop count, and other relevant attributes.
      </p>
    </div>

    <h2 class="subheading">Raw Peering Dataset</h2>

    <div class="section-container">
      <p>
        The raw peering dataset is available in the <code>bmp.updates</code> table. The schema is described in our <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/bmp/bmp.sql" target="_blank" rel="noopener">infrastructure</a> repository.
      </p>
      <p>
        Each router of <strong>as215011</strong> sends BMP messages to <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a>, which records the updates in a ClickHouse database.
      </p>
      <p>
        Each raw corresponds to an update or a withdraw, capturing prefixes, AS paths, communities, and other attributes.
      </p>
    </div>

    <h2 class="subheading">Raw Traffic Dataset</h2>

    <div class="section-container">
      <p>
        The raw traffic dataset is available in the <code>flows.records</code> table. The schema is described in our <a href="https://github.com/nxthdr/infrastructure/blob/main/clickhouse-tables/flows/flows.sql" target="_blank" rel="noopener">infrastructure</a> repository.
      </p>
      <p>
        Each router of <strong>as215011</strong> sends sflow messages to <a href="https://github.com/netsampler/goflow2" target="_blank" rel="noopener">goflow2</a>, which records the flow samples in a ClickHouse database.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyableCodeBlock from '@/components/CopyableCodeBlock.vue';

const exampleQuery = `echo """
     WITH concat(prefix_addr, '/', prefix_len) AS prefix
     SELECT prefix,
            max(length(communities)) AS n_communities
     FROM bmp.updates
     WHERE time_received_ns >= now() - INTERVAL 1 DAY
     GROUP BY prefix
     ORDER BY n_communities DESC
     LIMIT 5 FORMAT PRETTY
     """ | curl 'https://clickhouse.nxthdr.dev/?user=read&password=read' \\
          --data-binary @-`;
</script>

<style scoped>
code {
  font-family: monospace;
  background-color: var(--color-code-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.95em;
}

.callout {
  background-color: rgba(var(--color-accent-rgb), 0.1);
  border-left: 4px solid var(--color-accent);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0 6px 6px 0;
}

.callout p:last-child {
  margin-bottom: 0;
}
</style>


