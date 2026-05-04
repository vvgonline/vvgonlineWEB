import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['index.html', 'contact.html', 'blog.html', 'blog-post.html']
    }
  }
});
