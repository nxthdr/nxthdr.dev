<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <div class="content-section">
            <h1 class="about-title">About</h1>
            <div class="main-subtitle">A Wide-Open Window to the Internet</div>

            <p>
              <strong>nxthdr</strong> is a French non-profit organization (association loi 1901) that operates a global network infrastructure designed specifically for Internet research and education.
              We provide researchers, students, and network operators with two integrated platforms: <strong>PeerLab</strong> for BGP and routing experiments, and <strong>Saimiris</strong> for active Internet measurements.
            </p>

            <h2 class="subheading">The Problem</h2>
            <p>
              The Internet research community faces significant barriers to entry across two critical areas:
            </p>
            <p>
              <strong>Active Measurements:</strong> Existing platforms like RIPE Atlas <sup><a href="#ref-1" class="ref-link">[1]</a></sup> and CAIDA Ark <sup><a href="#ref-2" class="ref-link">[2]</a></sup> often require manual approval processes, impose credit systems, or lack self-service capabilities.
              For newcomers, especially PhD students and independent researchers, accessing measurement infrastructure and fresh datasets remains challenging.
            </p>
            <p>
              <strong>BGP Experiments:</strong> Conducting routing experiments requires substantial resources: IP prefixes, an autonomous system, and router infrastructure.
              While testbeds exist <sup><a href="#ref-3" class="ref-link">[3]</a></sup>, they typically don't integrate active measurements with routing experiments, making synchronized control and data plane studies difficult.
            </p>

            <h2 class="subheading">Our Approach</h2>
            <p>
              Rather than competing with large-scale platforms, nxthdr fills a specific gap: we're the only platform that integrates both active measurements and BGP experimentation in a single, cohesive environment.
            </p>
            <p>
              <strong>PeerLab (Peering Platform):</strong> Lease IPv6 prefixes and announce them through our network (AS215011) at multiple European Internet exchanges (FranceIX, FogIXP, LocIX, NL-IX).
              Conduct real BGP experiments with automated Docker-based setup, and access full BGP feeds and traffic data from our network.
            </p>
            <p>
              <strong>Saimiris (Probing Platform):</strong> Send active measurements from multiple global vantage points with full control over probe parameters and source addressing.
              Unique anycast measurement support enables studies impossible on other platforms.
            </p>
            <p>
              <strong>Integrated Platform:</strong> Announce your own prefixes via PeerLab and immediately measure how routing changes affect reachability and latency using Saimiris.
              All BGP data, traffic data, and measurement results are available in one place under open licensing (PDDL), with no application or approval process required.
            </p>

            <h2 class="subheading">Get Involved</h2>
            <p>
              We're actively expanding our infrastructure to support more research projects and educational initiatives.
              Join our <a href="https://discord.gg/KF3RSKXrSp" target="_blank" rel="noopener">Discord community</a> to discuss the project, or contact us at <a href="mailto:admin@nxthdr.dev">admin@nxthdr.dev</a> to support this initiative.
            </p>
          </div>

          <div class="references-section">
            <h2 class="subheading">References</h2>
            <ol class="references-list">
              <li id="ref-1">RIPE Atlas: <a href="https://atlas.ripe.net/" target="_blank" rel="noopener">https://atlas.ripe.net/</a></li>
              <li id="ref-2">CAIDA Archipelago: <a href="https://www.caida.org/projects/ark/" target="_blank" rel="noopener">https://www.caida.org/projects/ark/</a></li>
              <li id="ref-3">PEERING BGP Testbed: <a href="https://peering.ee.columbia.edu/" target="_blank" rel="noopener">https://peering.ee.columbia.edu/</a></li>
            </ol>
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
</script>

<style scoped>
/* Ensure reference styles are applied */
.references-section {
  margin-top: 3rem;
  padding-top: 2rem;
}

.references-list {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: reference-counter;
}

.references-list li {
  counter-increment: reference-counter;
  position: relative;
  padding: 0.5rem 0 0.5rem 2.5rem;
  margin-bottom: 0.25rem;
}

.references-list li::before {
  content: "[" counter(reference-counter) "]";
  position: absolute;
  left: 0;
  top: 0.5rem;
  font-weight: 600;
  color: var(--color-accent);
  font-size: 0.875rem;
  width: 2rem;
}

.references-list li a {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  word-break: break-all;
  transition: color 0.2s ease;
}

.references-list li a:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

/* Reference links in text */
:deep(.ref-link) {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  padding: 0.1rem 0.3rem;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

:deep(.ref-link:hover) {
  color: var(--color-accent-hover);
  transform: scale(1.05);
}
</style>

