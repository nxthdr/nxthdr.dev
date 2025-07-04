<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Saimiris</h1>
    <p class="docs-subtitle">High-performance internet measurement platform</p>

    <div class="section-container">
      <p>
        <strong>Saimiris</strong> is the measurement pipeline powering the <strong>nxthdr</strong> probing platform. Written in Rust, it provides a scalable and efficient solution for conducting active internet measurements across multiple vantage points.
      </p>
      <p>
        The platform is designed to handle large-scale measurement campaigns while maintaining high performance and reliability. Saimiris agents are deployed on probing servers worldwide, and the Saimiris Gateway API, allows to interact with the agents.
      </p>
      <p>
        Saimiris agents are deployed globally on our probing <router-link to="/docs/infrastructure">infrastructure</router-link> using the <router-link to="/docs/as215011">as215011</router-link> network. This allows measurements to be performed from addresses controlled by our autonomous system.
      </p>
    </div>

    <h2 class="subheading">Get started</h2>
    <div class="section-container">
      <p>
        The very first step is to register yourself on the nxthdr platform. Once done, you should be able to access to your <router-link to="/dashboard">dashboard</router-link>.
      </p>
      <p>
        On your dashboard, you will see how many probes credits you have available for the day. Currenly, each user is allocated <code>10000</code> credits per day, which allows you to send <code>10000</code> individual probes. Please <a href="mailto:admin@nxthdr.dev">contact us</a> if you need more.
      </p>
      <p>
        Also, you will find your <strong>Access Token</strong>. This token is necessary to authenticate your requests to the Saimiris Gateway API. You can use it to send measurements from your own scripts or applications. We are planning to provide a CLI tool to simplify this process in the future, but for now, you can use tools like <code>curl</code> or <code>httpie</code> to interact with the API directly.
      </p>

      <h3 class="section-title">Verify your token</h3>
      <p>
        To verify that your token is working correctly, you can check your available credits with this simple request:
      </p>
      <pre class="code-block">curl https://saimiris.nxthdr.dev/api/user/credits \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'</pre>
      <p>
        Replace <code>YOUR_ACCESS_TOKEN</code> with the actual token from your dashboard. This will return your current credit balance and daily limit.
      </p>

      <h3 class="section-title">Send your first probes</h3>
      <p>
        Once your token is verified, you can send some test probes to see the system in action. You can check the available agents and their IP addresses on your <router-link to="/dashboard">dashboard</router-link>. Here's an example that sends 4 probes to popular DNS servers:
      </p>
      <pre class="code-block">curl -X POST "https://saimiris.nxthdr.dev/api/probes" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -d '{
         "metadata": [
             {
                 "id": "vltcdg01"
             }
         ],
         "probes": [
             ["2606:4700:4700::1111", 12345, 53, 30, "icmp"],
             ["2606:4700:4700::1001", 12345, 53, 30, "udp"],
             ["2001:4860:4860::8888", 12345, 53, 30, "icmp"],
             ["2001:4860:4860::8844", 12345, 53, 30, "udp"]
         ]
     }'</pre>
      <p>
        This will send 4 probes (2 ICMP and 2 UDP) to Cloudflare and Google's IPv6 DNS servers. You can optionally add an <code>"ip_address"</code> field in the metadata to select a specific agent IP address (also shown on your dashboard).
      </p>
      <p>
        The API will return a <code>measurement_id</code> that you can use to retrieve the results later (explained in the next section). After running this command, go back to your <router-link to="/dashboard">dashboard</router-link> and refresh the page - you should see that your used credits have increased by 4.
      </p>

      <h3 class="section-title">Retrieve measurement results</h3>
      <p>
        Once your probes have been executed, you can query the results using the <code>measurement_id</code> returned from the previous API call. The results are stored in our ClickHouse database and can be accessed using the same credentials as our other <router-link to="/docs/datasets">datasets</router-link>:
      </p>
      <pre class="code-block">echo """
     SELECT *
     FROM saimiris.results
     WHERE measurement_id = 'YOUR_MEASUREMENT_ID'
     FORMAT PRETTY
     """ | curl 'https://clickhouse.nxthdr.dev/?user=read&password=read' \
          --data-binary @-</pre>
      <p>
        Replace <code>YOUR_MEASUREMENT_ID</code> with the actual measurement ID returned from your probe request. This will show you all the detailed results including round-trip times, ICMP responses, and any intermediate hops discovered during the measurement.
      </p>
      <p>
        <strong>Important note:</strong> all measurements data collected by Saimiris is made freely available for everyone, without any authentication, through our <router-link to="/docs/datasets">datasets</router-link>.
      </p>
    </div>
  </div>
</template>

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

code {
  background-color: var(--color-code-bg);
  color: var(--color-text);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}
</style>
