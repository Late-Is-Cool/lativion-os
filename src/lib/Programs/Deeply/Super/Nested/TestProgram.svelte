<script lang="ts">
	import Window from '$components/ui/window/Window.svelte';

	let { windowID, zIndex, minimized } = $props();
</script>

<Window {windowID} {zIndex} {minimized} title="test">
	{#snippet body()}
		yah
	{/snippet}
</Window>
