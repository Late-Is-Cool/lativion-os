<script module>
	export const meta = {
		title: 'oneko'
	};
</script>

<!-- TODO: THIS THING -->

<!-- <script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { removeWindow } from '$lib/index.svelte';

	let { windowID = 0 } = $props();
	let container: HTMLElement;

	onMount(() => {
		const script = document.createElement('script');
		script.src = '/System/ImportantFiles/Shell/oneko.js';
		script.dataset.windowId = windowID.toString();
		script.dataset.cat = '/System/ImportantFiles/Shell/oneko.gif';
		container.appendChild(script);
	});
</script>

<div bind:this={container} class="oneko-overlay"></div>

<style type="scss">
	.oneko-overlay {
		position: fixed;
		inset: 0;
		pointer-events: none; /* let windows and desktop receive input */
		z-index: 9993323423499;
	}
</style> -->
