<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <div class="title-glow-wrapper">
            <h1 class="home-title">nxthdr</h1>
          </div>
          <div class="main-subtitle">A Wide-Open Window to the Internet</div>
          <div class="content-section">
            <div class="intro-highlight">
              <p class="intro-main">
                <strong>nxthdr</strong> is a non-profit platform for Internet research and education.
                We operate a global network infrastructure that offers flexible worldwide active measurements from our own autonomous system and peering capabilities through multiple Internet exchanges.
              </p>
              <p class="intro-secondary">
                All datasets are shared in the public domain, every tool and systems are open source, and the entire infrastructure is designed rapid experimentation and reproducibility.
              </p>
            </div>
          </div>

          <div class="alert alert-important">
            <p v-if="!isAuthenticated">The probing platform is in <span class="beta-text">alpha</span>. <strong><button @click="handleLogin" class="link-style">Sign up</button></strong> to send your first probes from our network!</p>
            <p v-else>The probing platform is in <span class="beta-text">alpha</span>. Check the <router-link to="/docs/measurements">documentation</router-link> to send your first probes from our network!</p>
          </div>

          <div class="quick-access-section">
            <h2 class="quick-access-title">Start Exploring Now</h2>
            <div class="quick-links">
              <router-link to="/docs/measurements" class="quick-link">
                <span class="quick-link-title">Perform Measurements</span>
                <span class="quick-link-desc">Learn how to use our measurement platform and send your own probes</span>
              </router-link>
              <router-link to="/docs/datasets" class="quick-link">
                <span class="quick-link-title">Browse Datasets</span>
                <span class="quick-link-desc">Access public domain BGP routing data, measurement results, and traffic flows</span>
              </router-link>
            </div>
          </div>

          <h2 class="subheading">Applications</h2>
          <div class="content-section">
            <div class="use-cases-list-alt">
              <div class="use-case-item">
                <div class="use-case-title">Internet Topology & Performance Research</div>
                <div class="use-case-desc">Analyze BGP dynamics, CDN behavior, routing patterns, and global connectivity using comprehensive real-world measurement data.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Measurement Tooling & Algorithm Development</div>
                <div class="use-case-desc">Build, test, and benchmark innovative measurement techniques and algorithms leveraging our global high-speed infrastructure.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Data Science & Ethics Research</div>
                <div class="use-case-desc">Explore best practices in large-scale data collection, privacy-preserving techniques, ethical measurement design, and advanced visualization methods.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Reproducible Research</div>
                <div class="use-case-desc">Validate and reproduce prior studies with access to consistent, open datasets and standardized measurement infrastructure.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Education & Learning</div>
                <div class="use-case-desc">Enhance networking courses, workshops, and hands-on learning experiences with real Internet data and measurement capabilities.</div>
              </div>
            </div>
          </div>

          <h2 class="subheading">Flagship Projects</h2>

          <div class="content-section">
            <h3 class="section-title">Peering Platform</h3>
            <p>
              The peering platform is built around an autonomous system, as215011, which advertises multiple IPv6 prefixes.
              This network is designed to support researchers and students in conducting Internet-scale experiments on routing and peering.
            </p>
            <p>
              BGP data is collected using <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a> BGP Monitoring Protocol (BMP) collector.
              Each as215011 router sends BMP messages to risotto, which stores the updates in a ClickHouse database.
              By maintaining a state, risotto ensures accurate and comprehensive BGP data, which is made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis.
            </p>
          </div>

          <div class="content-section">
            <h3 class="section-title">Probing Platform</h3>
            <p>
              The probing platform consists of multiple servers distributed worldwide.
              These servers can perform high-speed traceroute-like and ping-like measurements.
              They advertise as215011 IPv6 prefixes, allowing measurements using both source unicast and anycast addresses.
            </p>
            <p>
              <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a> is a high-speed probing pipeline that provides the essential plumbing for users to perform active measurements from the probing servers.
              The measurements results are stored in a ClickHouse database and made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis.
            </p>
          </div>

          <h2 class="subheading">Our Principles</h2>
          <div class="content-section">
            <div class="principles-grid">
              <div class="principle-card">
                <h3>Open Data</h3>
                <p>All <router-link to="/docs/datasets">datasets</router-link> are public domain under <a href="https://opendatacommons.org/licenses/pddl/" target="_blank" rel="noopener">PDDL</a> license — no restrictions, delays, or authentication required.</p>
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
            <p>Join us on <a href="https://discord.gg/KF3RSKXrSp" target="_blank" rel="noopener">Discord</a> to discuss the project and get involved!</p>
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

<style scoped>
.title-glow-wrapper {
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  position: relative;
  animation: title-glow 3s ease-in-out infinite;
}

.home-title {
  font-size: 3.5rem !important;
  text-align: center;
  display: block !important;
  margin-bottom: 0 !important;
  filter: drop-shadow(0 0 20px rgba(45, 212, 191, 0.5)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4));
}

@keyframes title-glow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(45, 212, 191, 0.5)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 35px rgba(45, 212, 191, 0.7)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.6));
  }
}

.main-subtitle {
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 768px) {
  .title-glow-wrapper {
    animation: none; /* Disable animation on mobile to prevent blinking */
  }

  .home-title {
    font-size: 2.5rem !important;
    filter: drop-shadow(0 0 15px rgba(45, 212, 191, 0.4)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.3)); /* Static, softer glow on mobile */
  }

  .main-subtitle {
    font-size: 1.1rem;
  }
}

.intro-highlight {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.intro-main {
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.intro-secondary {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text-secondary, var(--color-text));
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .intro-highlight {
    padding: 1.5rem;
  }
}

.use-cases-list-alt {
  margin: 1.2rem 0 0 0;
  padding: 0;
}
.use-case-item {
  background: transparent;
  margin-bottom: 0.8rem;
  padding: 0.8rem 0;
  color: var(--color-text);
  line-height: 1.7;
  position: relative;
}
.use-case-title {
  color: var(--color-heading);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.use-case-desc {
  color: var(--color-text);
  line-height: 1.65;
  font-weight: 400;
}
</style>



