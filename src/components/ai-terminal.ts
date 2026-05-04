class AiTerminal extends HTMLElement {
  private isOpen = false;

  connectedCallback() {
    this.render();
    this.wireEvents();
  }

  static get observedAttributes() {
    return ['data-open'];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === 'data-open') {
      this.isOpen = newValue === 'true';
      this.updateOpenState();
    }
  }

  private render() {
    this.innerHTML = `
      <section class="ai-terminal" aria-label="AI assistant terminal">
        <button class="ai-terminal-toggle btn btn-warning btn-sm" type="button" aria-expanded="false">
          <i class="bi bi-cpu"></i>
          <span class="ms-1 d-none d-md-inline">AI Terminal</span>
        </button>
        <div class="ai-terminal-window shadow-lg" hidden>
          <header class="ai-terminal-header d-flex justify-content-between align-items-center">
            <span class="small text-uppercase">// AI_TERMINAL</span>
            <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Close"></button>
          </header>
          <div class="ai-terminal-body">
            <div class="ai-terminal-messages" data-messages>
              <div class="ai-message">
                <span class="ai-tag">SYSTEM</span>
                <p>You're connected to VVG ONLINE's sandboxed assistant. Ask about services, workflows, or how we approach digital transformation.</p>
              </div>
            </div>
            <form class="ai-terminal-input d-flex gap-2 mt-3" data-form>
              <input type="text" class="form-control form-control-sm" placeholder="Ask anything about your digital business..." aria-label="Message" required />
              <button class="btn btn-warning btn-sm" type="submit"><i class="bi bi-send"></i></button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  private wireEvents() {
    const toggleBtn = this.querySelector<HTMLButtonElement>('.ai-terminal-toggle');
    const windowEl = this.querySelector<HTMLElement>('.ai-terminal-window');
    const closeBtn = this.querySelector<HTMLButtonElement>('.btn-close');
    const form = this.querySelector<HTMLFormElement>('[data-form]');
    const messages = this.querySelector<HTMLElement>('[data-messages]');
    const input = this.querySelector<HTMLInputElement>('input[type="text"]');

    const scrollToBottom = () => {
      if (!messages) return;
      messages.scrollTop = messages.scrollHeight;
    };

    const appendMessage = (role: 'user' | 'ai', text: string) => {
      if (!messages) return;
      const wrapper = document.createElement('div');
      wrapper.className = role === 'user' ? 'user-message' : 'ai-message';
      wrapper.innerHTML = `
        <span class="ai-tag">${role === 'user' ? 'YOU' : 'AI'}</span>
        <p>${text}</p>
      `;
      messages.appendChild(wrapper);
      scrollToBottom();
    };

    const mockRespond = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const lower = trimmed.toLowerCase();
      if (lower.includes('service')) {
        appendMessage('ai', 'We structure services as modular workflows: trigger → diagnose → design → execute → measure. Each step is tuned to your context, not a generic playbook.');
      } else if (lower.includes('workflow')) {
        appendMessage('ai', 'Our workflow model treats every initiative as a loop: trigger, analysis, design, execution, and retrospectives that feed back into your operating model.');
      } else if (lower.includes('contact')) {
        appendMessage('ai', 'You can reach us via the Contact page, WhatsApp, or email — all linked in the footer. We respond within one business day.');
      } else {
        appendMessage('ai', 'Good question. In this sandbox we respond with curated snippets, but this terminal is designed to plug into a real API endpoint in production.');
      }
    };

    const setOpen = (open: boolean) => {
      this.isOpen = open;
      this.setAttribute('data-open', open ? 'true' : 'false');
      if (!windowEl || !toggleBtn) return;
      windowEl.hidden = !open;
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        input?.focus();
      }
    };

    this.updateOpenState();

    toggleBtn?.addEventListener('click', () => setOpen(!this.isOpen));
    closeBtn?.addEventListener('click', () => setOpen(false));

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input) return;
      const value = input.value.trim();
      if (!value) return;
      appendMessage('user', value);
      input.value = '';
      mockRespond(value);
    });
  }

  private updateOpenState() {
    const windowEl = this.querySelector<HTMLElement>('.ai-terminal-window');
    const toggleBtn = this.querySelector<HTMLButtonElement>('.ai-terminal-toggle');
    if (!windowEl || !toggleBtn) return;
    windowEl.hidden = !this.isOpen;
    toggleBtn.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
  }
}

customElements.define('ai-terminal', AiTerminal);
