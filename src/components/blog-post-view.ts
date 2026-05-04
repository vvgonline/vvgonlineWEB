import { marked } from 'marked';
import type { BlogPost } from '../types';

class BlogPostView extends HTMLElement {
  connectedCallback() {
    this.renderSkeleton();
    this.loadPost();
  }

  private renderSkeleton() {
    this.innerHTML = `
      <section class="py-5">
        <div class="container" data-blog-container>
          <p class="text-muted mb-3">Loading article...</p>
          <div class="placeholder-glow">
            <h1 class="display-5 placeholder col-8"></h1>
            <p class="placeholder col-6"></p>
          </div>
        </div>
      </section>
    `;
  }

  private getSlugFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
  }

  private async loadPost() {
    const slug = this.getSlugFromUrl();
    const container = this.querySelector<HTMLElement>('[data-blog-container]');
    if (!container) return;

    if (!slug) {
      container.innerHTML = '<p class="text-danger">Missing article slug.</p>';
      return;
    }

    try {
      const metaResponse = await fetch('/data/posts.json');
      if (!metaResponse.ok) throw new Error('Failed to load metadata');
      const posts = (await metaResponse.json()) as BlogPost[];
      const post = posts.find((p) => p.slug === slug);
      if (!post) {
        container.innerHTML = '<p class="text-danger">Article not found.</p>';
        return;
      }

      // Update document title and basic meta tags for better SEO
      document.title = `${post.title} - VVG ONLINE`;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', post.excerpt);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      ogTitle?.setAttribute('content', post.title);
      const ogDescription = document.querySelector('meta[property="og:description"]');
      ogDescription?.setAttribute('content', post.excerpt);
      const ogImage = document.querySelector('meta[property="og:image"]');
      ogImage?.setAttribute('content', post.image);

      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      twitterTitle?.setAttribute('content', post.title);
      const twitterDescription = document.querySelector('meta[property="twitter:description"]');
      twitterDescription?.setAttribute('content', post.excerpt);
      const twitterImage = document.querySelector('meta[property="twitter:image"]');
      twitterImage?.setAttribute('content', post.image);

      const mdResponse = await fetch(`/content/blog/${encodeURIComponent(post.slug)}.md`);
      if (!mdResponse.ok) throw new Error('Failed to load content');
      const markdown = await mdResponse.text();
      const html = marked.parse(markdown);

      container.innerHTML = `
        <article class="blog-post">
          <header class="mb-4">
            <p class="text-uppercase small text-warning mb-1">${post.tag}</p>
            <h1 class="display-4 fw-bold mb-3">${post.title}</h1>
            <div class="d-flex flex-wrap gap-3 text-muted small mb-3">
              <span class="d-flex align-items-center gap-1"><i class="bi bi-calendar"></i> ${new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: '2-digit' })}</span>
              <span class="d-flex align-items-center gap-1"><i class="bi bi-clock"></i> ${post.readTime}</span>
            </div>
            <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-4" loading="lazy" width="960" height="540" />
          </header>
          <section class="blog-post-body" data-blog-body>${html}</section>
        </article>
      `;
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p class="text-danger">Failed to load this article. Please try again later.</p>';
    }
  }
}

customElements.define('blog-post-view', BlogPostView);
