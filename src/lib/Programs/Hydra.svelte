<script module>
	export const meta = {
		title: 'HYDRA',
		scalable: false
	};
</script>

<script lang="ts">
	import Prompt from '$components/ui/Prompt.svelte';
	import { newWindow, removeWindow } from '$lib/index.svelte';
	import { onMount } from 'svelte';

	let { windowID, zIndex, minimized } = $props();

	let focus: HTMLButtonElement;

	function close() {
		removeWindow(windowID);
		newWindow('hydra');
		newWindow('hydra');
	}

	onMount(() => {
		focus.focus();
	});
</script>

<Prompt
	icon="Warning"
	{windowID}
	{zIndex}
	title={meta.title}
	initialPosition={{
		x: Math.random() * (innerWidth - 375),
		y: Math.random() * (innerHeight - 150)
	}}
	{minimized}
	onClose={close}
>
	{#snippet content()}
		Cut off a head, two more will take its place.<br />
		[Hydra ViRuS BioCoded by Unknown]
	{/snippet}
	{#snippet buttons()}
		<button bind:this={focus} class="button" onclick={close}>GET OUT</button>
	{/snippet}
</Prompt>
