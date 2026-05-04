import type { WorkflowNode } from '../types';

class WorkflowTimeline extends HTMLElement {
  private intervalId: number | null = null;

  connectedCallback() {
    this.renderSkeleton();
    this.loadWorkflow();
  }

  disconnectedCallback() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
  }

  private renderSkeleton() {
    this.innerHTML = `
      <section id="workflow" class="py-5 bg-dark text-light">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="display-6 fw-bold">Operational Logic</h2>
            <p class="lead text-muted">From trigger to measurable output, visualized as a looping workflow.</p>
          </div>
          <div class="workflow-grid" data-workflow-slot></div>
        </div>
      </section>
    `;
  }

  private async loadWorkflow() {
    try {
      const response = await fetch('/data/workflow.json');
      if (!response.ok) return;
      const nodes = (await response.json()) as WorkflowNode[];
      const slot = this.querySelector('[data-workflow-slot]');
      if (!slot) return;

      slot.innerHTML = nodes
        .map(
          (node, index) => `
          <div class="workflow-node" data-index="${index}">
            <div class="workflow-hex">${node.hex}</div>
            <h3 class="workflow-title h5">${node.title}</h3>
            <p class="workflow-description">${node.description}</p>
          </div>`
        )
        .join('');

      this.startLoop(nodes.length);
    } catch {
      // keep static skeleton
    }
  }

  private startLoop(count: number) {
    if (count === 0) return;
    let current = 0;
    const nodes = Array.from(this.querySelectorAll<HTMLElement>('.workflow-node'));
    const activate = (index: number) => {
      nodes.forEach((node, i) => {
        node.classList.toggle('is-active', i === index);
      });
    };

    activate(current);
    this.intervalId = window.setInterval(() => {
      current = (current + 1) % count;
      activate(current);
    }, 2500);
  }
}

customElements.define('workflow-timeline', WorkflowTimeline);
