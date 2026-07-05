<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.scss';
	import 'animate.css';

	if (browser) {
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
			import('overlayscrollbars/overlayscrollbars.css');
		}
	}

	let { children } = $props();

	let description =
		"LateTheIdiot's awesome simulated operating system site! Practically a portfolio with fun stuff (eventually)";
</script>

{@render children()}

<svelte:head>
	<title>Lativion OS | LateTheIdiot</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="Lativion OS" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/System/ImportantFiles/Brand/LativionOS-Outline.svg" />
	<meta name="theme-color" content="#f0e961" />
</svelte:head>
