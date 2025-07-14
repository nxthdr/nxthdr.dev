<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <div class="content-section">
            <h1 class="about-title">About</h1>
            <div class="main-subtitle">nxthdr & as215011</div>
            <p>
              Hey, I'm <a href="https://matthieugouel.name/" target="_blank" rel="noopener">Matthieu Gouel</a>.
              My <a href="https://theses.hal.science/tel-04164622v1/document" target="_blank" rel="noopener">PhD</a> focused on measuring the Internet using large-scale ping and traceroute data to enhance our understanding of how the Internet operates in practice.
              But, to be honest, I was more interested in building the tools and platforms than in writing papers.
            </p>
            <p>
              I believe the Internet Measurements community still lacks fundamental tools that enable rapid experimentation and reproducibility of experiments at Internet scale.
              Many tools and platforms have emerged and disappeared over the years, often driven by researchers and students as part of their academic work.
              The few production-ready platforms that exist tend to be closed source, outdated, impose intentional publishing delays, or lack self-service features for running experiments.
            </p>
            <p>
              During my PhD, I had the opportunity to work in a well-known lab alongside amazing well-known researchers in the community.
              This gave me the chance to connect with people and gain access to datasets and platforms.
              But unfortunately, that such opportunities may not be as easily available to those working independently or in smaller labs.
            </p>
            <p>
              nxthdr and as215011 are built on ideas that have existed for a long time, such as a BGP testbed <sup><a href="#ref-1" class="ref-link">[1]</a></sup> and a high-speed probing platform <sup><a href="#ref-2" class="ref-link">[2]</a></sup>.
              The real edge lies in combining these ideas into a single platform and making it open, accessible to everyone, while providing tools and documentation.
            </p>
            <p>
              This project is a personal initiative, maintained independently during my free time.
              It is not affiliated with my current employer.
              I receive no compensation, funding, or income from this project, and it is operated on a voluntary, non-commercial basis.
            </p>
            <p>
              Feel free to join the <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener">Discord</a>, to discuss the project and get involved!
            </p>
          </div>

          <div class="references-section">
            <h2 class="subheading">References</h2>
            <ol class="references-list">
              <li id="ref-1">PEERING BGP Testbed: <a href="https://peering.ee.columbia.edu/" target="_blank" rel="noopener">https://peering.ee.columbia.edu/</a></li>
              <li id="ref-2">Iris Probing Platform: <a href="https://iris.dioptra.io/" target="_blank" rel="noopener">https://iris.dioptra.io/</a></li>
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

