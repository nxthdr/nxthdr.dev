<template>
  <div class="docs-page-content">
    <h1 class="docs-title">AS215011 Network</h1>
    <p class="docs-subtitle">The autonomous system powering nxthdr's global measurement platform</p>

    <div class="section-container">
      <p>
        AS215011 is the autonomous system assigned to nxthdr that forms the backbone of our global measurement platform. This network is designed to support researchers and students in conducting Internet-scale experiments on routing and peering.
      </p>
    </div>

    <h2 class="subheading">Network Overview</h2>

    <div class="section-container">
      <p>AS215011 is deployed with the following characteristics:</p>
      <ul class="values-list">
        <li><strong>IPv6-only</strong> - Focused on the next-generation Internet protocol</li>
        <li><strong>Multiple prefixes</strong> - Advertises several IPv6 prefixes for different measurement purposes</li>
        <li><strong>Global presence</strong> - Connected to multiple IXPs around the world</li>
        <li><strong>Open peering policy</strong> - Welcomes peering with any network</li>
      </ul>

      <h3 class="section-title">Network Architecture</h3>
      <p>
        The AS215011 network consists of multiple routers deployed at different locations worldwide. Each router:
      </p>
      <ul class="values-list">
        <li>Runs <a href="https://frrouting.org/" target="_blank" rel="noopener">FRRouting</a> for BGP and other routing protocols</li>
        <li>Establishes BGP sessions with peers at IXPs and via direct connections</li>
        <li>Sends BMP (BGP Monitoring Protocol) data to our central collectors</li>
        <li>Is fully managed via automation using Ansible</li>
      </ul>
    </div>

    <h2 class="subheading">Peering Information</h2>

    <div class="section-container">
      <p>We maintain an open peering policy and welcome connections from any network. Our peering details:</p>
      <ul class="values-list">
        <li><strong>ASN</strong>: 215011</li>
        <li><strong>IRR</strong>: AS-NXTHDR</li>
        <li><strong>Peering email</strong>: peering@nxthdr.dev</li>
      </ul>
      <p>
        We're present at multiple IXPs globally. For an up-to-date list of our peering locations, please check <a href="https://peeringdb.com/asn/215011" target="_blank" rel="noopener">PeeringDB</a>.
      </p>
    </div>

    <h2 class="subheading">BGP Data Collection</h2>

    <div class="section-container">
      <p>
        All AS215011 routers send BGP data via the BGP Monitoring Protocol (BMP) to our <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a> collector. This data includes:
      </p>
      <ul class="values-list">
        <li>BGP updates (announcements and withdrawals)</li>
        <li>Router state information</li>
        <li>Peer down/up notifications</li>
        <li>Statistics messages</li>
      </ul>
      <p>
        The collected data is stored in a ClickHouse database and is freely available for research and analysis. Visit our <router-link to="/docs/datasets">Datasets</router-link> page for more information.
      </p>
    </div>
  </div>
</template>


