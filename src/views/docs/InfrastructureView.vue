<template>
  <div class="docs-page-content">
    <h1 class="docs-title">Infrastructure</h1>
    <p class="docs-subtitle">The nxthdr infrastructure is built to support internet measurements at scale</p>

    <div class="section-container">
      <p>
        The nxthdr platform consists of multiple components working together to provide a comprehensive solution for Internet measurements. Our infrastructure is designed to be reliable, scalable, and easily accessible to researchers and students.
      </p>
      <p>
        All of our infrastructure is managed as code and is publicly available on <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">GitHub</a>. This transparency allows anyone to see how the platform is built and even contribute improvements.
      </p>
    </div>

    <h2 class="subheading">Key Components</h2>

    <div class="section-container">
      <h3 class="section-title">AS215011 Network</h3>
      <p>
        The <router-link to="/docs/as215011">AS215011</router-link> network is the backbone of nxthdr, providing global connectivity through multiple IXPs and peering relationships. This autonomous system advertises several IPv6 prefixes that are used for measurements.
      </p>

      <h3 class="section-title">Probing Servers</h3>
      <p>
        Our distributed probing servers are located at strategic points around the world. These servers run our high-speed measurement tools and collect data about the Internet's structure and performance.
      </p>

      <h3 class="section-title">Data Storage</h3>
      <p>
        All measurement data is stored in a distributed ClickHouse database cluster. This setup allows for efficient querying and analysis of massive datasets, making it possible to study Internet behavior at scale.
      </p>
    </div>

    <h2 class="subheading">Infrastructure as Code</h2>

    <div class="section-container">
      <p>The entire nxthdr infrastructure is managed using:</p>
      <ul class="values-list">
        <li><strong>Terraform</strong> - For cloud resource provisioning</li>
        <li><strong>Ansible</strong> - For configuration management</li>
        <li><strong>Docker</strong> - For containerized services</li>
      </ul>
      <p>
        This approach ensures consistency, reproducibility, and transparency. All configuration files are available in our <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure repository</a>.
      </p>
    </div>

    <h2 class="subheading">Observability</h2>

    <div class="section-container">
      <p>
        All components of the nxthdr infrastructure are monitored using Prometheus and visualized with Grafana. Our <a href="https://grafana.nxthdr.dev/dashboards" target="_blank" rel="noopener">public dashboards</a> provide real-time insights into the health and performance of the platform.
      </p>
    </div>
  </div>
</template>

