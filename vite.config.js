import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// allowedHosts: ['common-bats-mix.loca.lt']
		allowedHosts: true
	}
});
