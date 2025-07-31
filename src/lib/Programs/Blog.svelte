<script lang="ts">
	import Window from '$components/ui/window/Window.svelte';

	let { windowID, zIndex, minimized } = $props();

	let moving = $state(false);

	$effect(() => {
		console.log(moving);
	});
</script>

<Window title="Blog" {windowID} {zIndex} {minimized}>
	{#snippet body()}
		<iframe
			src="https://blog.latetheidiot.dev/"
			class:nopointer={!moving}
			onmousemove={() => (moving = true)}
			onmouseleave={() => (moving = false)}
		></iframe>
	{/snippet}
</Window>

<style lang="scss">
	iframe {
		width: 100%;
		height: 100%;
	}
	.nopointer {
		pointer-events: none;
	}
</style>
