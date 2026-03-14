<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';

	let { text, children }: { text: string; children?: Snippet } = $props();

	let item: HTMLButtonElement;

	setContext('tablistMenu', {
		tablistItem: () => item
	});

	let tablistContext = getContext<TablistContext>('tablist');
	const index = tablistContext.register();
</script>

<svelte:window
	onmousedown={(event) => {
		if (item && event.target) {
		}
		tablistContext.activate(null);
	}}
/>

<button
	class="window_tablist-button"
	onclick={(e) => {
		e.stopPropagation();
		if (tablistContext.isActive(index)) {
			tablistContext.activate(null);
			return;
		}
		tablistContext.activate(index);
	}}
	onmouseenter={() => {
		if (!tablistContext.isActive(null)) {
			tablistContext.activate(index);
		}
	}}
	bind:this={item}>{text}</button
>

{#if tablistContext.isActive(index)}
	{@render children?.()}
{/if}
