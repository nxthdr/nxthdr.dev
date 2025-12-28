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
                All datasets are shared in the public domain, every tool and systems are open source, and the entire infrastructure is designed rapid experimentation, education and reproducibility.
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
                <span class="quick-link-desc">Learn how to use our measurement platform and send your own probes.</span>
              </router-link>
              <router-link to="/docs/datasets" class="quick-link">
                <span class="quick-link-title">Browse Datasets</span>
                <span class="quick-link-desc">Access public domain BGP routing data, measurement results, and traffic flows.</span>
              </router-link>
            </div>
          </div>

          <h2 class="subheading">Applications</h2>
          <div class="content-section">
            <div class="use-cases-list-alt">
              <div class="use-case-item">
                <div class="use-case-title">BGP & Routing Experiments</div>
                <div class="use-case-desc">Peer with our IXP servers, lease public IPv6 prefixes, and announce them to the real Internet. Conduct hands-on experiments with BGP policies, traffic engineering, and routing dynamics in production networks.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Internet Topology & Performance Research</div>
                <div class="use-case-desc">Perform active measurements from multiple global locations and analyze BGP dynamics, CDN behavior, routing patterns, and global connectivity using comprehensive real-world data.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Joint Peering & Probing Studies</div>
                <div class="use-case-desc">Combine active measurements with your own announced prefixes to conduct unique experiments impossible on other platforms. Study how routing changes affect reachability, latency, and path selection in real-time.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Measurement Tooling & Algorithm Development</div>
                <div class="use-case-desc">Build, test, and benchmark innovative measurement techniques and algorithms leveraging our global high-speed infrastructure with full control over source addressing.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Education & Learning</div>
                <div class="use-case-desc">Teach networking courses with real Internet resources. Students can peer with actual IXPs, announce real prefixes, and perform measurements on production networks.</div>
              </div>
              <div class="use-case-item">
                <div class="use-case-title">Reproducible Research</div>
                <div class="use-case-desc">Validate and reproduce prior studies with access to consistent, open datasets and standardized measurement infrastructure across both passive BGP monitoring and active probing.</div>
              </div>
            </div>
          </div>

          <h2 class="subheading">Our Platforms</h2>

          <div class="content-section">
            <h3 class="section-title"><router-link to="/peering">Peering</router-link> Platform</h3>
            <p>
              Peer directly with our IXP servers from anywhere in the world and lease public IPv6 prefixes to announce to the real Internet.
              Our autonomous system, as215011, operates at multiple Internet exchanges, enabling you to conduct hands-on BGP experiments, test routing policies, and study peering dynamics in production networks.
              Whether you are researching traffic engineering, validating routing security mechanisms, or teaching students about inter-domain routing, you have full control to announce and withdraw prefixes as needed for your experiments.
            </p>
            <p>
              All BGP routing data from as215011 is passively collected using <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a>, our BGP Monitoring Protocol (BMP) collector.
              Each router sends real-time BMP messages to risotto, which maintains routing state and stores updates in a ClickHouse database.
              This comprehensive BGP data is made freely <router-link to="/docs/datasets">available</router-link> to everyone, providing visibility into routing behavior across our network and the prefixes you announce.
            </p>
          </div>

          <div class="content-section">
            <h3 class="section-title"><router-link to="/probing">Probing</router-link> Platform</h3>
            <p>
              Perform high-speed active measurements from our globally distributed servers.
              Send traceroute-like and ping-like probes from multiple locations worldwide, using both unicast and anycast source addresses from as215011 IPv6 prefixes.
              This enables you to study Internet topology, measure path diversity, analyze CDN behavior, and conduct latency studies from real network infrastructure.
            </p>
            <p>
              <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a> is our high-speed probing pipeline that handles the entire measurement workflow from probe scheduling to result collection.
              All measurement results are stored in a ClickHouse database and made freely <router-link to="/docs/datasets">available</router-link> to everyone for analysis, ensuring reproducibility and enabling large-scale Internet research.
            </p>
          </div>

          <h2 class="subheading">Our Principles</h2>
          <div class="content-section">
            <div class="principles-grid">
              <div class="principle-card">
                <h3>Open Data</h3>
                <p>All <router-link to="/docs/datasets">datasets</router-link> are public domain under <a href="https://opendatacommons.org/licenses/pddl/" target="_blank" rel="noopener">PDDL</a> license. No restrictions, delays, or authentication required.</p>
              </div>
              <div class="principle-card">
                <h3>Open Source</h3>
                <p>Every <a href="https://github.com/nxthdr" target="_blank" rel="noopener">applications</a> and piece of <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure</a> is open source. Use them, contribute, or run your own instance.</p>
              </div>
              <div class="principle-card">
                <h3>Radically Transparent</h3>
                <p>Our <a href="https://grafana.nxthdr.dev/dashboards" target="_blank" rel="noopener">monitoring</a>, <a href="https://github.com/orgs/nxthdr/projects/1" target="_blank" rel="noopener">roadmap</a>, and <a href="https://docs.google.com/spreadsheets/d/1ptkRO_R6Jgl1gUEaqihGFT23hSMS3msxBi8uUaS5xFo/edit?usp=sharing" target="_blank" rel="noopener">finances</a> are completely public.</p>
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
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, user, loginWithRedirect } = useAuth0();

function handleLogin() {
  loginWithRedirect();
}

onMounted(async () => {
  // Auth0 automatically provides user info when authenticated
  // No need to manually fetch it
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



