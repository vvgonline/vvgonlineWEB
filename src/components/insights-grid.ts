import type { BlogPost } from '../types';

class InsightsGrid extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
    this.loadPosts();
  }

  private renderSkeleton() {
    this.innerHTML = `
      <section id="insights" class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="fw-bold display-5">Latest Insights</h2>
            <p class="lead">Our latest thoughts on the pivotal issues defining the modern business era.</p>
          </div>
          <div class="row" data-insights-slot>
            ${Array.from({ length: 3 })
              .map(
                () => `
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card h-100 shadow-sm blog-card placeholder-glow">
                    <div class="ratio ratio-16x9 bg-secondary placeholder"></div>
                    <div class="card-body">
                      <span class="placeholder col-3 mb-2"></span>
                      <h5 class="card-title placeholder col-10"></h5>
                      <p class="card-text placeholder col-9"></p>
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

  private async loadPosts() {
    try {
      const response = await fetch('/data/posts.json');
      if (!response.ok) return;
      const posts = (await response.json()) as BlogPost[];
      const slot = this.querySelector('[data-insights-slot]');
      if (!slot) return;

      const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
      const top = sorted.slice(0, 6);

      slot.innerHTML = top
        .map(
          (post) => `
          <div class="col-lg-4 col-md-6 mb-4">
            <article class="card h-100 shadow-sm blog-card">
              <img src="${post.image}" class="card-img-top blog-img" alt="${post.title}" loading="lazy" width="640" height="360" />
              <div class="card-body">
                <span class="blog-category">${post.tag}</span>
                <h3 class="card-title blog-title h5">${post.title}</h3>
                <p class="blog-excerpt small text-muted">${post.excerpt}</p>
                <div class="blog-meta d-flex justify-content-between flex-wrap mb-2">
                  <span class="d-flex align-items-center gap-1"><i class="bi bi-calendar"></i> ${new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                  <span class="d-flex align-items-center gap-1"><i class="bi bi-clock"></i> ${post.readTime}</span>
                </div>
                <a href="blog-post.html?slug=${encodeURIComponent(post.slug)}" class="read-more" title="Read ${post.title}">Read More <i class="bi bi-arrow-right"></i></a>
              </div>
            </article>
          </div>`
        )
        .join('');
    } catch {
      // keep skeleton
    }
  }
}

customElements.define('insights-grid', InsightsGrid);
