import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { adapter: adapter({
			fallback: 'index.html', // may differ from host to host
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: false,
			
		}),
		paths: {
	    base: '',
	    //base: process.env.NODE_ENV === 'production' ? '/granderoyal' : '',
	    
	  },

	  files: {
      assets: 'static' // Points to shared static folder.  DEV
      //assets: '../ui' // Points to shared static folder. PROD
    },
  },
  preprocess: vitePreprocess(),
  appDir: 'internal',
};

export default config;
