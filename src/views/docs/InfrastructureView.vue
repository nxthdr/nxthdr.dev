<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Infrastructure</h1>
    <p class="docs-subtitle">Built to support internet measurements at scale</p>

    <div class="section-container">
      <p>
        This page offers an overview of the nxthdr platform's infrastructure, outlining its key components and progressively building a complete picture of the system.
        The infrastructure is managed as code and is open-source, accessible in the <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure</a> repository.
      </p>
    </div>

    <h2 class="subheading">as215011 Network</h2>

    <div class="section-container">
      <img src="/infrastructure/ixp.png" alt="nxthdr infrastructure IXP diagram" class="infrastructure-image" />
      <p>
        We operate the as215011 Asynchronous System (AS) network to enable Internet-scale peering and routing experiments.
      </p>
      <p>
        Currently, as215011 consists of servers running <a href="https://bird.network.cz/" target="_blank" rel="noopener">BIRD</a> routing daemon located in Frankfurt and Amsterdam.
        Those servers are uniquely connected to Internet Exchange Point (IXP) LANs, allowing us to peer with multiple ASes and exchange routing information.
        See the <router-link to="/docs/as215011">as215011</router-link> page for more information.
      </p>
      <p>
        In addition, we use as215011 to reach nxthdr services, allowing us to dogfood our own network.
        Each of those IXP servers is connected to a core server via a WireGuard tunnel.
        The core server announces the prefix <code>2a06:de00:50::/44</code> to the IXP servers, which then propagate it to the Internet.
        As a result, traffic destined for nxthdr services is routed through the IXP servers before reaching the core server.
      </p>
    </div>

    <h2 class="subheading">Probing Servers</h2>

    <div class="section-container">
      <img src="/infrastructure/probing.png" alt="nxthdr infrastructure probing diagram" class="infrastructure-image" />
      <p>
        We also manage probing servers used for active measurements.
        These servers are <a href="https://www.vultr.com/" target="_blank" rel="noopener">Vultr</a> instances located in multiple locations worldwide.
        They run a <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a> probing agent.
        These servers rely on the core server to function, as it manages and stores the data (probes and results) using Redpanda and ClickHouse.
      </p>
      <p>
        The probing servers advertise the sub prefixes of <code>2a0e:97c0:8a0::/44</code>, which is dedicated to the nxthdr probing infrastructure.
        This enables measurements using source unicast and anycast addresses managed by as215011.
        As with other parts of the network, the limitation is that it is IPv6-only.
        However, if measurements need to be performed from IPv4-only networks, the server's IPv4 address can possibly be used.
      </p>
    </div>

    <h2 class="subheading">Core Services</h2>

    <div class="section-container">
      <img src="/infrastructure/core.png" alt="nxthdr core services diagram" class="infrastructure-image" />
      <p>
        All essential nxthdr services run on a core server, a <a href="https://www.scaleway.com/en/dedibox/" target="_blank" rel="noopener">Scaleway</a> Dedibox bare-metal server located in Amsterdam.
        nxthdr relies on various key components, including ClickHouse and PostgreSQL for databases, Redpanda for data streaming, and Prometheus, Loki, and Grafana for observability.
        These are examples of the technologies currently in use, and they may evolve as the platform grows.
      </p>
      <p>
        All services are managed using <a href="https://www.docker.com/" target="_blank" rel="noopener">Docker</a>. We utilize two Docker networks.
        The <em>backend</em> network is internal and not accessible from the internet, facilitating communication between services.
        The <em>dmz</em> network is internet-facing and used by a <a href="https://caddyserver.com/" target="_blank" rel="noopener">Caddy</a> HTTPS reverse proxy to route traffic to backend services.
        Some non-HTTPS services also have an interface in the dmz network.
      </p>
      <p>
        Currently, there is no redundancy for the core server, but regular backups of service data are performed.
      </p>

      <h3 class="section-title">IPv4 Proxy</h3>
      <p>
        The current limitation of as215011 is that it is IPv6-only.
        To address this, we use an "IPv4 proxy server", a <a href="https://www.scaleway.com/en/" target="_blank" rel="noopener">Scaleway</a> cloud instance with a public IPv4 address.
        This server proxies IPv4 traffic to the IPv6-only core server through a <a href="https://caddyserver.com/" target="_blank" rel="noopener">Caddy</a> reverse proxy.
      </p>
      <p>
        All nxthdr domains have both A and AAAA records: the A records point to the IPv4 proxy service, and the AAAA records point to the core services directly.
      </p>
    </div>

    <DocsNavigation />
  </div>
</template>

<script setup lang="ts">
import DocsNavigation from '@/components/DocsNavigation.vue';
</script>

<style scoped>
.infrastructure-image {
  max-width: 100%;
  height: auto;
  margin: 1rem 0 2rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

