<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <h1>A Wide-Open Window to the Internet</h1>
          <div class="main-subtitle">Internet Measurements — Open, Ethical, and For Everyone</div>
          <div class="content-section">
            <p>
              <b>nxthdr</b>, pronounced /ˈnɛkst ˈhɛdə˞/ or simply "Next Header", is an initiative to offer metrology capabilities to researchers and students to study and learn about the Internet.
            </p>
            <p>
              It integrates high-speed probing capabilities together with peering control, offering the community a unique platform. The <b>nxthdr</b> infrastructure enables Internet-scale route tracing while managing and collecting BGP advertisements from diverse vantage points and multiple IXPs, powered by the <b>as215011</b> network.
            </p>
          </div>

          <div class="alert alert-important">
            <p>Currently, <b>nxthdr</b> is in its early stages and not yet open to the public for experiments. However, the datasets collected are already accessible.</p>
          </div>

          <h2 class="subheading">Flagship Projects</h2>

          <div class="content-section">
            <h3 class="section-title">Peering Platform</h3>
            <p>
              The peering platform is built around an autonomous system, <b>as215011</b>, which advertises multiple IPv6 prefixes. This network is designed to support researchers and students in conducting Internet-scale experiments on routing and peering.
            </p>
            <p>
              BGP data is collected using <code>risotto</code> BGP Monitoring Protocol (BMP) collector. Each <b>as215011</b> router sends BMP messages to risotto, which stores the updates in a ClickHouse database. By maintaining a state, risotto ensures accurate and comprehensive BGP data, which is made freely available to everyone for analysis.
            </p>
          </div>

          <div class="content-section">
            <h3 class="section-title">Probing Platform</h3>
            <p>
              The probing platform consists of multiple servers distributed worldwide. These servers can perform high-speed traceroute-like and ping-like measurements. They advertise <b>as215011</b> IPv6 prefixes, allowing measurements using both source unicast and anycast addresses.
            </p>
            <p>
              <code>saimiris</code> is a high-speed probing pipeline that provides the essential plumbing for users to perform active measurements from the probing servers. The measurements results are stored in a ClickHouse database and made freely available to everyone for analysis.
            </p>
          </div>

          <h2 class="subheading">Values</h2>
          <div class="content-section">
            <p>Every aspect of <b>nxthdr</b> is open, transparent and participatory:</p>
            <ul class="values-list">
              <li>The <b>datasets</b> collected is freely accessible under ODbL license, with no restrictions, delay, authentication, or need for justification.</li>
              <li>The <b>tools</b> powering the platform are all open-source, such as <code>risotto</code> and <code>saimiris</code>. You can use them, contribute to them, or even run your own instance.</li>
              <li>The <b>infrastructure</b> is managed entirely as open-source code. You can see the configuration of the servers and routers, the services running, the monitoring setup, the database tables and more.</li>
              <li>The <b>observability</b> is public, with Grafana dashboards providing real-time insights into the platform's health.</li>
              <li>The <b>roadmap</b> of the project is public and participatory, inviting ideas and contributions.</li>
              <li>The <b>bookkeeping</b> is complete and publicly available. It includes the financial transactions, the donations received and the budget forecast.</li>
            </ul>
          </div>

          <h2 class="subheading">Get Involved</h2>
          <div class="content-section">
            <p>Join us on <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener">Discord</a> to discuss the project and get involved!</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { ref, onMounted } from 'vue';
import { useLogto, type IdTokenClaims } from '@logto/vue';

const { isAuthenticated, getIdTokenClaims } = useLogto();
const user = ref<IdTokenClaims>();

onMounted(async () => {
  if (isAuthenticated.value) {
    const claims = await getIdTokenClaims();
    user.value = claims;
  }
});
</script>

