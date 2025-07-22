<script module>
	export const meta = {
		title: 'HYDRA',
		scalable: false
	};
</script>

<script lang="ts">
	import Prompt from '$components/ui/Prompt.svelte';
	import { newWindow, removeWindow } from '$lib/index.svelte';
	import { activeWindowState } from '$stores/stores.svelte';

	let { windowID, zIndex, minimized } = $props();

	let active = $state(true);

	$effect(() => {
		console.log(activeWindowState.activeWindow === windowID);
		active = activeWindowState.activeWindow === windowID;
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
>
	{#snippet content()}
		Cut off a head, two more will take its place.<br />
		[Hydra ViRuS BioCoded by Unknown]
	{/snippet}
	{#snippet buttons()}
		<button
			class="button"
			onclick={() => {
				removeWindow(windowID);
				newWindow('prompttest');
				newWindow('prompttest');
			}}>GET OUT</button
		>
	{/snippet}
</Prompt>
