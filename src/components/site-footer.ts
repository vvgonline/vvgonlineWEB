import type { SiteConfig } from '../types';

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
    this.loadConfig();
  }

  private renderSkeleton() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer py-4 mt-5 border-top">
        <div class="container">
          <div class="row align-items-center gy-3">
            <div class="col-md-4 text-center text-md-start small text-muted">
              &copy; ${year} VVG ONLINE. All Rights Reserved.
            </div>
            <div class="col-md-4 text-center">
              <a class="navbar-brand" href="index.html" title="VVG ONLINE">
                <img src="./assets/images/logo-2025.svg" alt="VVG ONLINE" class="footer-logo-img" loading="lazy" width="64" height="64" />
              </a>
            </div>
            <div class="col-md-4 text-center text-md-end">
              <a href="privacy.html" class="text-muted me-3 small">Privacy Policy</a>
              <a href="#" class="text-muted me-3 small" data-footer-youtube aria-label="Visit our YouTube channel" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="#" class="text-muted small" data-footer-github aria-label="Visit our GitHub profile" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-github"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  private async loadConfig() {
    try {
      const response = await fetch('/data/site.json');
      if (!response.ok) return;
      const config = (await response.json()) as SiteConfig;
      const youtubeLink = this.querySelector<HTMLAnchorElement>('[data-footer-youtube]');
      const githubLink = this.querySelector<HTMLAnchorElement>('[data-footer-github]');
      if (youtubeLink) youtubeLink.href = config.social.youtube;
      if (githubLink) githubLink.href = config.social.github;
    } catch {
      // skeleton is acceptable
    }
  }
}

customElements.define('site-footer', SiteFooter);
