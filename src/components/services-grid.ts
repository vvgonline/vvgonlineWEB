import type { ServiceItem } from '../types';

class ServicesGrid extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
    this.loadServices();
  }

  private renderSkeleton() {
    this.innerHTML = `
      <section id="services" class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="display-5 fw-bold">What do we do for you?</h2>
            <p class="lead">We create change that matters—transformation, enabled by technology and sustained through capabilities.</p>
          </div>
          <div class="row" data-services-slot>
            ${['01', '02', '03']
              .map(
                (n) => `
                  <div class="col-md-4 mb-4">
                    <div class="card service-card h-100 placeholder-glow">
                      <div class="card-body">
                        <div class="placeholder col-3 mb-3"></div>
                        <h3 class="card-title placeholder col-8"></h3>
                        <p class="card-text placeholder col-12"></p>
                      </div>
                    </div>
                  </div>`
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  private async loadServices() {
    try {
      const response = await fetch('/data/services.json');
      if (!response.ok) return;
      const services = (await response.json()) as ServiceItem[];
      const slot = this.querySelector('[data-services-slot]');
      if (!slot) return;

      slot.innerHTML = services
        .map(
          (service) => `
          <div class="col-md-4 mb-4">
            <div class="card service-card h-100 ${service.highlighted ? 'service-card-highlighted' : ''}">
              <div class="card-body">
                <div class="service-number text-muted mb-2">${service.number}</div>
                <h3 class="card-title service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
              </div>
            </div>
          </div>`
        )
        .join('');
    } catch {
      // keep skeleton
    }
  }
}

customElements.define('services-grid', ServicesGrid);
