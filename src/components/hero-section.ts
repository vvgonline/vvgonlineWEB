import type { SiteConfig } from '../types';

class HeroSection extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
    this.loadConfig();
  }

  private renderSkeleton() {
    this.innerHTML = `
      <section class="hero-section position-relative">
        <div class="hero-overlay"></div>
        <video id="hero-video-background" class="hero-video" autoplay muted loop playsinline disablePictureInPicture controlsList="nodownload" oncontextmenu="return false;">
          <source src="./assets/videos/vvgonline-hero-banner-720p.mp4" type="video/mp4" />
        </video>
        <div class="container hero-content text-center">
          <p class="hero-kicker text-uppercase mb-2">Digital Business Consulting</p>
          <h1 class="hero-title display-3 fw-bold" data-hero-text>Transform Your Vision into Reality</h1>
          <p class="hero-subtitle lead fs-4" data-hero-tagline>
            Driving you beyond growth, through unique, innovative, and result-oriented digital consulting.
          </p>
          <a href="contact.html" class="btn btn-warning btn-lg mt-4">
            Start Your Transformation
          </a>
        </div>
      </section>
    `;

    const video = this.querySelector<HTMLVideoElement>('#hero-video-background');
    if (video) {
      video.addEventListener('canplay', () => {
        video.classList.add('video-loaded');
      });
    }
  }

  private async loadConfig() {
    try {
      const response = await fetch('/data/site.json');
      if (!response.ok) return;
      const config = (await response.json()) as SiteConfig;
      const titleEl = this.querySelector<HTMLElement>('[data-hero-text]');
      const taglineEl = this.querySelector<HTMLElement>('[data-hero-tagline]');
      if (titleEl) titleEl.textContent = config.heroText;
      if (taglineEl) taglineEl.textContent = config.tagline;
    } catch {
      // use skeleton content
    }
  }
}

customElements.define('hero-section', HeroSection);
