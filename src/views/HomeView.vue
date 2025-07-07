<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <h1 class="home-title">A Wide-Open Window to the Internet</h1>
          <div class="main-subtitle">Internet Measurements — Open, Ethical, and For Everyone</div>
          <div class="content-section">
            <p>
              nxthdr, pronounced "Next Header", is an initiative to offer metrology capabilities to researchers and students to study and learn about the Internet.
            </p>
            <p>
              It integrates high-speed probing capabilities together with peering control, offering the community a unique platform. The nxthdr <router-link to="/docs/infrastructure">infrastructure</router-link> enables Internet-scale route tracing while managing and collecting BGP advertisements from diverse vantage points and multiple IXPs, powered by the <router-link to="/docs/as215011">as215011</router-link> network.
            </p>
          </div>

          <div class="alert alert-important">
            <p>Currently, nxthdr is in its early stages and not yet open to the public for experiments. However, the <router-link to="/docs/datasets">datasets</router-link> collected are already accessible.</p>
          </div>

          <h2 class="subheading">Flagship Projects</h2>

          <div class="content-section">
            <h3 class="section-title">Peering Platform</h3>
            <p>
              The peering platform is built around an autonomous system, <router-link to="/docs/as215011">as215011</router-link>, which advertises multiple IPv6 prefixes. This network is designed to support researchers and students in conducting Internet-scale experiments on routing and peering.
            </p>
            <p>
              BGP data is collected using <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a> BGP Monitoring Protocol (BMP) collector. Each as215011 router sends BMP messages to risotto, which stores the updates in a ClickHouse database. By maintaining a state, risotto ensures accurate and comprehensive BGP data, which is made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis.
            </p>
          </div>

          <div class="content-section">
            <h3 class="section-title">Probing Platform</h3>
            <p>
              The probing platform consists of multiple servers distributed worldwide. These servers can perform high-speed traceroute-like and ping-like measurements. They advertise <router-link to="/docs/as215011">as215011</router-link> IPv6 prefixes, allowing measurements using both source unicast and anycast addresses.
            </p>
            <p>
              <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a> is a high-speed probing pipeline that provides the essential plumbing for users to perform active measurements from the probing servers. The measurements results are stored in a ClickHouse database and made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis.
            </p>
          </div>

          <h2 class="subheading">Values</h2>
          <div class="content-section">
            <p>Every aspect of nxthdr is open, transparent and participatory:</p>
            <ul class="values-list">
              <li>The <router-link to="/docs/datasets">datasets</router-link> collected is freely accessible under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener">ODbL</a> license, with no restrictions, delay, authentication, or need for justification.</li>
              <li>The <a href="https://github.com/nxthdr" target="_blank" rel="noopener">tools</a> powering the platform are all open-source, such as <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a> and <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a>. You can use them, contribute to them, or even run your own instance.</li>
              <li>The <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure</a> is managed entirely as open-source code. You can see the configuration of the servers and routers, the services running, the monitoring setup, the database tables and more.</li>
              <li>The <a href="https://grafana.nxthdr.dev/dashboards" target="_blank" rel="noopener">observability</a> is public, with Grafana dashboards providing real-time insights into the platform's health.</li>
              <li>The <a href="https://github.com/orgs/nxthdr/projects/1" target="_blank" rel="noopener">roadmap</a> of the project is public and participatory, inviting ideas and contributions.</li>
              <li>The <a href="https://docs.google.com/spreadsheets/d/1fguIDaXn4DuEexZrudJjzn2Sucpy8Qx5bACcYEH1ie4/edit?usp=sharing" target="_blank" rel="noopener">bookkeeping</a> is complete and publicly available. It includes the financial transactions, the donations received and the budget forecast.</li>
            </ul>
          </div>

          <h2 class="subheading">Get Involved</h2>
          <div class="content-section">
            <p>Join us on <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener">Discord</a> to discuss the project and get involved!</p>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
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

