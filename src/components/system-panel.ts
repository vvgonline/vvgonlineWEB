import type { SiteConfig } from '../types';

class SystemPanel extends HTMLElement {
  private clockElement: HTMLElement | null = null;

  connectedCallback() {
    this.renderSkeleton();
    this.loadConfig();
  }

  private renderSkeleton() {
    this.innerHTML = `
      <header class="system-panel navbar navbar-expand-lg fixed-top px-2">
        <div class="container-fluid align-items-center">
          <div class="d-flex align-items-center gap-2">
            <a href="index.html" class="navbar-brand d-flex align-items-center gap-2" title="VVG ONLINE">
              <img src="./assets/images/logo-2025.svg" alt="VVG ONLINE" class="system-panel-logo" loading="lazy" width="32" height="32">
              <span class="brand-text">VVG ONLINE</span>
            </a>
            <span class="brand-tag d-none d-md-inline">// ACCESS THE FUTURE</span>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#systemPanelNav" aria-controls="systemPanelNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="systemPanelNav">
            <ul class="navbar-nav ms-auto" data-nav-slot></ul>
            <div class="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0">
              <button class="btn btn-sm btn-outline-warning" type="button" data-theme-toggle aria-label="Toggle theme">
                <i class="bi bi-moon"></i>
              </button>
              <span class="system-clock small text-muted" data-clock>--:--:--</span>
              <button class="btn btn-sm btn-outline-light d-none d-md-inline-flex align-items-center gap-1" type="button" data-open-terminal>
                <span class="terminal-indicator"></span>
                <span>AI Terminal</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    this.clockElement = this.querySelector('[data-clock]');
    this.startClock();
    this.wireThemeToggle();
    this.wireTerminalButton();
  }

  private async loadConfig() {
    try {
      const response = await fetch('/data/site.json');
      if (!response.ok) return;
      const config = (await response.json()) as SiteConfig;
      this.renderNav(config);
    } catch {
      // fail silently; skeleton nav stays minimal
    }
  }

  private renderNav(config: SiteConfig) {
    const navSlot = this.querySelector('[data-nav-slot]');
    if (!navSlot) return;

    navSlot.innerHTML = config.navItems
      .map(
        (item) => `
          <li class="nav-item">
            <a class="nav-link" href="${item.href}">
              ${item.icon ? `<i class="bi ${item.icon} me-1"></i>` : ''}${item.label}
            </a>
          </li>`
      )
      .join('');
  }

  private startClock() {
    const update = () => {
      if (!this.clockElement) return;
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, '0');
      const mm = now.getMinutes().toString().padStart(2, '0');
      const ss = now.getSeconds().toString().padStart(2, '0');
      this.clockElement.textContent = `${hh}:${mm}:${ss} IST`;
    };
    update();
    setInterval(update, 1000);
  }

  private wireThemeToggle() {
    const toggleBtn = this.querySelector('[data-theme-toggle]') as HTMLButtonElement | null;
    const root = document.documentElement;

    const applyTheme = (theme: 'light' | 'dark') => {
      root.setAttribute('data-theme', theme);
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        toggleBtn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
      }
    };

    let current: 'light' | 'dark' = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(current);

    toggleBtn?.addEventListener('click', () => {
      current = current === 'dark' ? 'light' : 'dark';
      applyTheme(current);
    });
  }

  private wireTerminalButton() {
    const button = this.querySelector('[data-open-terminal]');
    if (!button) return;
    button.addEventListener('click', () => {
      const terminal = document.querySelector('ai-terminal') as HTMLElement | null;
      terminal?.setAttribute('data-open', 'true');
    });
  }
}

customElements.define('system-panel', SystemPanel);
