import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/admin' : '';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
  preprocess: vitePreprocess(),
  kit: { 
    adapter: adapter({ 
      fallback: 'index.html'
    }),
    paths: {
      base: basePath
    }
  } 
};

export default config;