import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    manifest: true, // For integration with Nginx
  },
	plugins: [tailwindcss(), sveltekit()],
	 // server: {
     // force: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9090/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
 // },
});
