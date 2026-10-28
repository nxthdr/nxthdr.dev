<template>
  <div class="page-root">
    <AppHeader />
    <main class="home">
      <!-- Hero -->
      <section class="container hero">
        <div class="eyebrow">Non-profit · AS215011 · Public domain data</div>
        <h1 class="hero-title">Open infrastructure for Internet <span class="accent">experimentation</span>.</h1>
        <div class="hero-row">
          <p class="hero-lede">
            A global network for Internet research and education. Run active measurements from our own autonomous system
            and peer with us at multiple Internet exchanges.
          </p>
          <div class="actions">
            <button v-if="!isAuthenticated" class="btn btn-primary" @click="handleLogin">Get started</button>
            <a v-else href="https://docs.nxthdr.dev/docs" target="_blank" rel="noopener" class="btn btn-primary">Get started</a>
            <a href="https://docs.nxthdr.dev/docs" target="_blank" rel="noopener" class="btn btn-secondary">Documentation</a>
          </div>
        </div>
      </section>

      <!-- Flow diagram -->
      <section class="container flow-wrap" aria-label="How nxthdr works">
        <div class="flow">
          <div class="flow-node">
            <span class="flow-tag">you</span>
            <span class="flow-name">Your lab or laptop</span>
            <span class="flow-desc">peerlab · API</span>
          </div>
          <div class="flow-link" aria-hidden="true">
            <span>BGP sessions</span>
            <span class="flow-line"></span>
            <span>probe requests</span>
          </div>
          <div class="flow-node flow-node-core">
            <span class="flow-tag">as215011</span>
            <span class="flow-name">nxthdr network</span>
            <span class="flow-desc">IXP routers · probing servers</span>
          </div>
          <div class="flow-link" aria-hidden="true">
            <span>announcements</span>
            <span class="flow-line"></span>
            <span>probes</span>
          </div>
          <div class="flow-node">
            <span class="flow-tag">world</span>
            <span class="flow-name">The real Internet</span>
            <span class="flow-desc">results → open datasets</span>
          </div>
        </div>
      </section>

      <!-- Start exploring -->
      <section class="band">
        <div class="container stack">
          <div class="section-head">
            <h2 class="section-heading">Start exploring</h2>
            <p class="section-intro">Two platforms in alpha, a growing public dataset, and the open source tools that run it all.</p>
          </div>
          <div class="platform-grid">
            <article class="platform-card">
              <div class="platform-card-head">
                <h3>Peering</h3>
                <span class="badge">alpha</span>
              </div>
              <p>
                Peer with our IXP servers from anywhere, receive the full IPv6 table, lease public prefixes and announce
                or withdraw them freely. Every BGP update is collected by
                <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a> and published.
              </p>
              <div class="platform-card-foot">
                <span class="mono-muted">
                  <a href="https://github.com/nxthdr/peerlab" target="_blank" rel="noopener">peerlab</a> ·
                  <a href="https://github.com/nxthdr/risotto" target="_blank" rel="noopener">risotto</a>
                </span>
                <button v-if="!isAuthenticated" class="card-cta" @click="handleLogin">Sign up →</button>
                <a v-else href="https://docs.nxthdr.dev/docs/peering/" target="_blank" rel="noopener" class="card-cta">Get started →</a>
              </div>
            </article>
            <article class="platform-card">
              <div class="platform-card-head">
                <h3>Probing</h3>
                <span class="badge">alpha</span>
              </div>
              <p>
                Send traceroute- and ping-like probes from globally distributed servers, with unicast and anycast sources
                from as215011 prefixes. <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a>
                runs the pipeline; results land in ClickHouse.
              </p>
              <div class="platform-card-foot">
                <span class="mono-muted">
                  <a href="https://github.com/nxthdr/saimiris" target="_blank" rel="noopener">saimiris</a>
                </span>
                <button v-if="!isAuthenticated" class="card-cta" @click="handleLogin">Sign up →</button>
                <router-link v-else to="/docs/measurements" class="card-cta">Get started →</router-link>
              </div>
            </article>
            <router-link to="/docs/datasets" class="link-card">
              <span class="link-card-text">
                <span class="link-card-title">Browse datasets</span>
                <span class="link-card-desc">BGP routing data, measurement results and traffic flows.</span>
              </span>
              <span class="link-card-arrow" aria-hidden="true">→</span>
            </router-link>
            <a href="https://docs.nxthdr.dev/docs/tools/" target="_blank" rel="noopener" class="link-card">
              <span class="link-card-text">
                <span class="link-card-title">Build with our tools</span>
                <span class="link-card-desc">Open source tools and APIs for your research pipeline.</span>
              </span>
              <span class="link-card-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Applications -->
      <section class="band">
        <div class="container stack">
          <div class="section-head">
            <h2 class="section-heading">What people build on nxthdr</h2>
            <p class="section-intro">Experiments that need real prefixes, real peers and real paths — not a simulator.</p>
          </div>
          <div class="apps-grid">
            <div v-for="(app, i) in applications" :key="app.title" class="app-item">
              <span class="app-index">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3>{{ app.title }}</h3>
              <p>{{ app.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Principles -->
      <section class="principles">
        <div class="container stack">
          <h2 class="section-heading principles-heading">Open data. Open source. Radically transparent.</h2>
          <div class="principles-grid">
            <div class="principle">
              <h3>Open data</h3>
              <p>All <router-link to="/docs/datasets">datasets</router-link> are public domain under <a href="https://opendatacommons.org/licenses/pddl/" target="_blank" rel="noopener">PDDL</a>. No restrictions, delays, or authentication.</p>
            </div>
            <div class="principle">
              <h3>Open source</h3>
              <p>Every <a href="https://github.com/nxthdr" target="_blank" rel="noopener">application</a> and piece of <a href="https://github.com/nxthdr/infrastructure" target="_blank" rel="noopener">infrastructure</a> is open source. Use it, contribute, or run your own.</p>
            </div>
            <div class="principle">
              <h3>Radically transparent</h3>
              <p>Our <a href="https://grafana.nxthdr.dev/dashboards" target="_blank" rel="noopener">monitoring</a>, <a href="https://github.com/orgs/nxthdr/projects/1" target="_blank" rel="noopener">roadmap</a> and <a href="https://docs.google.com/spreadsheets/d/1ptkRO_R6Jgl1gUEaqihGFT23hSMS3msxBi8uUaS5xFo/edit?usp=sharing" target="_blank" rel="noopener">finances</a> are completely public.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Get involved -->
      <section class="container cta">
        <h2 class="cta-title">Get involved.</h2>
        <p class="cta-text">Join the chat to discuss the project, ask questions and help build open Internet infrastructure.</p>
        <div class="actions actions-center">
          <a href="https://chat.nxthdr.dev" target="_blank" rel="noopener" class="btn btn-primary">Join the chat</a>
          <a href="https://github.com/nxthdr" target="_blank" rel="noopener" class="btn btn-secondary">GitHub ↗</a>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, loginWithRedirect } = useAuth0();

const applications = [
  {
    title: 'BGP & routing experiments',
    desc: 'Lease IPv6 prefixes and announce them. Explore BGP policies, traffic engineering, RPKI validation and routing dynamics.',
  },
  {
    title: 'Topology & performance research',
    desc: 'Measure from many locations; study BGP dynamics, CDN behavior and global connectivity.',
  },
  {
    title: 'Joint peering & probing studies',
    desc: 'Probe your own announcements to see how routing changes affect reachability, latency and path selection.',
  },
  {
    title: 'Measurement tooling',
    desc: 'Build and benchmark new techniques with full control over source addressing.',
  },
  {
    title: 'Education',
    desc: 'Students peer with actual IXPs, announce real prefixes and measure production networks.',
  },
  {
    title: 'Reproducible research',
    desc: 'Reproduce prior studies on consistent open datasets and standardized infrastructure.',
  },
];

function handleLogin() {
  loginWithRedirect();
}
</script>

<style scoped>
.home {
  flex: 1 1 auto;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.band {
  border-top: 1px solid var(--color-border);
  padding: 6rem 0;
}

h2, h3 {
  margin: 0;
  padding: 0;
  border: none;
}

p {
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.actions-center {
  justify-content: center;
}

/* Hero */
.hero {
  padding-top: 7rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.hero-title {
  margin: 0;
  max-width: 1000px;
  font-size: clamp(2.75rem, 7vw, 5.75rem);
  line-height: 0.98;
  letter-spacing: -0.045em;
  font-weight: 600;
  color: var(--color-heading);
}

.accent {
  color: var(--color-accent);
}

.hero-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}

.hero-lede {
  max-width: 600px;
  font-size: 1.25rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

/* Flow diagram */
.flow-wrap {
  padding-bottom: 7rem;
}

.flow {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 1rem;
  align-items: stretch;
}

.flow-node {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.flow-node-core {
  border-color: var(--color-accent);
  background: #EEF7F3;
}

.flow-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.flow-node-core .flow-tag {
  color: var(--color-accent-ink);
}

.flow-name {
  font-weight: 600;
  font-size: 1.0625rem;
  color: var(--color-heading);
}

.flow-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.flow-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.flow-line {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
}

/* Section headings */
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.section-heading {
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 600;
}

.section-intro {
  max-width: 440px;
  color: var(--color-text-muted);
}

/* Platforms */
.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
  gap: 1.25rem;
}

.platform-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.platform-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.platform-card-head h3 {
  font-size: 1.875rem;
  letter-spacing: -0.02em;
}

.platform-card p {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  flex-grow: 1;
}

.platform-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid #EDEDE8;
}

.mono-muted {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.mono-muted a {
  color: var(--color-text-muted);
  font-weight: 400;
}

.card-cta {
  background: none;
  border: none;
  font: inherit;
  font-weight: 500;
  color: var(--color-accent-ink);
  text-decoration: none;
  padding: 0.6rem 0;
  cursor: pointer;
}

.card-cta:hover {
  color: var(--color-accent-hover);
}

.link-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  color: var(--color-heading);
  text-decoration: none;
  font-weight: 400;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.link-card:hover {
  color: var(--color-heading);
  border-color: var(--color-border-strong);
  background: var(--color-surface);
}

.link-card-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-card-title {
  font-weight: 600;
  font-size: 1.25rem;
}

.link-card-desc {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.link-card-arrow {
  font-size: 1.375rem;
  transition: transform 0.15s ease;
}

.link-card:hover .link-card-arrow {
  transform: translateX(3px);
}

/* Applications */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  column-gap: 2.5rem;
}

.app-item {
  border-top: 1px solid #D6D6CF;
  padding: 1.5rem 0 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.app-index {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-accent-ink);
}

.app-item h3 {
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}

.app-item p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

/* Principles (inverted band) */
.principles {
  background: var(--color-inverse-bg);
  padding: 6rem 0;
}

.principles-heading {
  max-width: 720px;
  color: #FFFFFF;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 2.5rem;
}

.principle {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid #34373B;
  padding-top: 1.5rem;
}

.principle h3 {
  font-size: 1.25rem;
  color: #FFFFFF;
}

.principle p {
  color: #B4B8BC;
}

.principle a {
  color: #FFFFFF;
  text-decoration-color: rgba(255, 255, 255, 0.4);
}

.principle a:hover {
  color: #FFFFFF;
  text-decoration-color: #FFFFFF;
}

/* Get involved */
.cta {
  padding-top: 7rem;
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.cta-title {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 600;
}

.cta-text {
  max-width: 520px;
  font-size: 1.125rem;
  color: var(--color-text-secondary);
}

.cta .actions {
  padding-top: 0.5rem;
}

@media (max-width: 768px) {
  .hero {
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .hero-lede {
    font-size: 1.125rem;
  }

  .flow-wrap {
    padding-bottom: 4rem;
  }

  .flow,
  .platform-card {
    padding: 1.5rem;
  }

  .link-card {
    padding: 1.5rem;
  }

  .band,
  .principles {
    padding: 4rem 0;
  }

  .cta {
    padding-top: 4.5rem;
    padding-bottom: 4.5rem;
  }
}
</style>
