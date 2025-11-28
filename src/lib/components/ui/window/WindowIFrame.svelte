<script lang="ts">
	import { getContext } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	let {
		src,
		node = $bindable(),
		onload = () => {}
	}: { src: string; node?: HTMLElement; onload?: EventHandler } = $props();

	let windowContext = getContext<WindowContext>('window');
</script>

<iframe
	class="window_iframe"
	{onload}
	class:window_iframe_disable={windowContext.status.idle ||
		windowContext.status.moving ||
		windowContext.status.resizing}
	{src}
	bind:this={node}
/>
