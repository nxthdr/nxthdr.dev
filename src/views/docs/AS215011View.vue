<template>
  <div class="docs-page-content">
    <h1 class="docs-title">as215011</h1>
    <p class="docs-subtitle">The autonomous system powering nxthdr's global measurement platform</p>

    <div class="section-container">
      <p>
        We currently administrate the Autonomous System (AS) <a href="https://www.peeringdb.com/net/36080" target="_blank" rel="noopener">215011</a>, announcing multiple IPv6 prefixes.
      </p>
      <p>
        The <strong>as215011</strong> network is currently IPv6-only and is connected to multiple Internet Exchange Points (IXPs) in Europe. It is used for conducting routing and peering experiments and can also be combined with the <strong>nxthdr</strong> probing platform to perform active measurements while controlling prefix announcements during experiments. Additionally, it is possible to peer with <strong>as215011</strong> for experimental or non-commercial purposes.
      </p>
      <p>
        The <strong>as215011</strong> network is used to provide connectivity to the <strong>nxthdr</strong> <router-link to="/docs/infrastructure">infrastructure</router-link>, allowing us to dogfood our own network.
      </p>
      <p>
        Routing data collected by <strong>as215011</strong> routers is made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis.
      </p>
    </div>

    <h2 class="subheading">Network Overview</h2>

    <div class="section-container">
      <h3 class="section-title">IXPs presence</h3>
      <pre class="code-block">
FogIXP - Frankfurt
LOCIX  - Frankfurt
NL-IX  - Amsterdam</pre>

      <h3 class="section-title">Announced prefixes</h3>
      <pre class="code-block">
2a06:de00:50::/44  - NXTHDR
2a0e:97c0:8a0::/44 - NXTHDR-RESEARCH
2a06:de01:d0::/44  - DSCP</pre>

      <p>
        We embrace a radical transparency approach, so you can view the full <a href="https://github.com/nxthdr/infrastructure/tree/main/networks" target="_blank" rel="noopener">configuration</a> of <strong>as215011</strong> routers. If you identify a security issue, please feel free to open an issue or submit a pull request in the repository. Alternatively, you can join our <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener">Discord</a> server or email us at <a href="mailto:admin@nxthdr.dev">admin@nxthdr.dev</a>.
      </p>
      <p>
        You can check our geofeed <a href="https://geofeed.nxthdr.dev" target="_blank" rel="noopener">here</a>.
      </p>
    </div>

    <h2 class="subheading">Peering Policy</h2>

    <div class="section-container">
      <p>
        <strong>as215011</strong> operates an open peering policy and can also provide transit for other ASes, either through direct peering at IXPs or via a WireGuard tunnel. We enforce RPKI filtering with a refresh interval of 900 seconds.
      </p>
      <p>
        You can check our peers <a href="https://peers.nxthdr.dev" target="_blank" rel="noopener">here</a>.
      </p>
    </div>

    <h2 class="subheading">Acknowledgements</h2>

    <div class="section-container">
      <p>
        We thank the <a href="https://www.cnrs.fr/fr" target="_blank" rel="noopener">CNRS</a> for generously providing the NL-IX IXP server located in Amsterdam in 2024 for a one-year period.
      </p>
    </div>
  </div>
</template>

<style scoped>
.code-block {
  background-color: var(--color-code-bg);
  color: var(--color-text);
  padding: 1rem;
  border-radius: 6px;
  font-family: monospace;
  margin: 1.5rem 0;
  white-space: pre;
  overflow-x: auto;
  font-size: 0.9rem;
}
</style>


