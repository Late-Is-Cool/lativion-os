<script>
	import '../app.scss';
	import 'animate.css';

	let { children } = $props();
</script>

{@render children()}

<svelte:head>
	<title>Lativion OS | LateTheIdiot</title>
	<meta property="og:title" content="Lativion OS" />
	<meta
		name="description"
		content="LateTheIdiot's awesome simulated website! Practically a portfolio with fun stuff (eventually)"
	/>
	<meta
		property="og:description"
		content="LateTheIdiot's awesome simulated website! Practically a portfolio with fun stuff (eventually)"
	/>
	<meta property="og:image" content="/System/ImportantFiles/Brand/LativionOS-Outline.png" />
	<meta name="theme-color" content="#f0e961" />
</svelte:head>
