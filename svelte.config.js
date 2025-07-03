import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	
	
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$screens: 'src/lib/screens',
			$programs: 'src/lib/programs'
		}
	},
	compilerOptions: {
		// disable a11y warnings because i need to focus on functionality first, rather than accessibility.
		// ps. why are web developers so rude about disabling a11y warnings?
		// i understand making the web more accessible but it distracts me from doing what i need to do.
		// (disabling a11y warnings == nazi?)
		// # https://www.reddit.com/r/sveltejs/comments/1984s6n/how_do_i_disable_all_a11y_messages_they_are/
		warningFilter: (warning) => {
			if (warning.code.includes("a11y")) return;
		}
	},
	preprocess: [mdsvex(), vitePreprocess({
		style: {
			css: {
				preprocessorOptions: {
					sass: {
						additionalData: `
							@import './src/styles/variables.scss
							@import './src/styles/functions.scss
						`
					}
				}
			}
		}
	})],
	extensions: ['.svelte', '.svx'],

	
};

export default config;
