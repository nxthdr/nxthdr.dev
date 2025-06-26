<template>
  <div class="page-root">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="content-card">
          <div class="content-section">
            <h1 class="about-title">About</h1>
            <div class="main-subtitle">nxthdr and as215011</div>
            <p>
              Hey, I'm <a href="https://matthieugouel.name/" target="_blank" rel="noopener">Matthieu Gouel</a>. My <a href="https://theses.hal.science/tel-04164622v1/document" target="_blank" rel="noopener">PhD</a> focused on measuring the Internet using large-scale ping and traceroute data to enhance our understanding of how the Internet operates in practice. But, to be honest, I was more interested in building the tools and platforms than in writing papers.
            </p>
            <p>
              I believe the Internet measurement community still lacks fundamental tools that enable rapid experimentation and reproducibility of experiments at Internet scale. While many tools and platforms have emerged and disappeared over the years--often driven by researchers and students as part of their academic work--the few production-ready platforms that exist tend to be closed source, outdated, impose intentional publishing delays, or lack self-service features for running experiments.
            </p>
            <p>
              I had the opportunity to work in a well-known lab alongside amazing well-known researchers in the community. This gave me the chance to connect with people and gain access to datasets and platforms. But unfortunately, that such opportunities may not be as easily available to those working independently or in smaller labs.
            </p>
            <p>
              <b>nxthdr</b> and <b>as215011</b> are built on ideas that have existed for a long time, such as a BGP testbed <sup>[1]</sup> and a high-speed probing platform <sup>[2]</sup>. The real edge lies in combining these ideas into a single platform and making it open, accessible to everyone, and provides openly licensed data without delay.
            </p>
            <p>
              Feel free to join the <a href="https://discord.gg/KRsVs7jafg" target="_blank" rel="noopener">Discord</a>, to discuss the project and get involved!
            </p>
          </div>

          <div class="references-section">
            <h2 class="subheading">References</h2>
            <ol class="references-list">
              <li id="ref-1">PEERING BGP Testbed: <a href="https://peering.ee.columbia.edu/" target="_blank" rel="noopener">https://peering.ee.columbia.edu/</a></li>
              <li id="ref-2">Iris Probing Platform: <a href="https://iris.dioptra.io/#/" target="_blank" rel="noopener">https://iris.dioptra.io/#/</a></li>
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

