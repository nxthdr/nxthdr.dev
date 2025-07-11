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
              nxthdr combines a high-performance measurement platform with a peering platform connected to multiple Internet exchange points. We provide researchers, students, and enthusiasts with tools to study Internet routing and connectivity from a dedicated autonomous system.
            </p>
            <p>
              Browse our datasets freely — no registration required. Want to send your own measurements? Sign up to access our global measurement infrastructure.
            </p>
          </div>

          <div class="alert alert-important">
            <p v-if="!isAuthenticated">The probing pipeline is in <span class="beta-text">beta</span>! <strong><button @click="handleLogin" class="link-style">Sign up</button></strong> to send your first probes from as215011!</p>
            <p v-else>The probing pipeline is in <span class="beta-text">beta</span>! Check the <router-link to="/docs/measurements">documentation</router-link> to send your first probes from as215011!</p>
          </div>

          <div class="quick-access-section">
            <h2 class="quick-access-title">Start Exploring Now</h2>
            <div class="quick-links">
              <router-link to="/docs/measurements" class="quick-link">
                <span class="quick-link-title">Send Measurements</span>
                <span class="quick-link-desc">Learn how to use our measurement platform and send your own probes</span>
              </router-link>
              <router-link to="/docs/datasets" class="quick-link">
                <span class="quick-link-title">Browse Datasets</span>
                <span class="quick-link-desc">Network probes, BGP routing data, and traffic flows — query directly with SQL</span>
              </router-link>
            </div>
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

          <h2 class="subheading">Our Principles</h2>
          <div class="content-section">
            <div class="principles-grid">
              <div class="principle-card">
                <h3>Open Data</h3>
                <p>All <router-link to="/docs/datasets">datasets</router-link> are freely accessible under <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener">ODbL</a> license — no restrictions, delays, or authentication required.</p>
              </div>
              <div class="principle-card">
                <h3>Open Source</h3>
                <p>Every <a href="https://github.com/nxthdr" target="_blank" rel="noopener">applications</a> and piece of <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure</a> is open source. Use them, contribute, or run your own instance.</p>
              </div>
              <div class="principle-card">
                <h3>Radically Transparent</h3>
                <p>Our <a href="https://grafana.nxthdr.dev/dashboards" target="_blank" rel="noopener">monitoring</a>, <a href="https://github.com/orgs/nxthdr/projects/1" target="_blank" rel="noopener">roadmap</a>, and <a href="https://docs.google.com/spreadsheets/d/1fguIDaXn4DuEexZrudJjzn2Sucpy8Qx5bACcYEH1ie4/edit?usp=sharing" target="_blank" rel="noopener">finances</a> are completely public.</p>
              </div>
            </div>
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

const { isAuthenticated, getIdTokenClaims, signIn } = useLogto();
const user = ref<IdTokenClaims>();

function handleLogin() {
  signIn(window.location.origin + '/callback');
}

onMounted(async () => {
  if (isAuthenticated.value) {
    const claims = await getIdTokenClaims();
    user.value = claims;
  }
});
</script>



