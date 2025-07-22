<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ContextMenuProps {
		x: number;
		y: number;
		items: Snippet;
		node?: HTMLElement;
	}
	let { x, y, items, node = $bindable() }: ContextMenuProps = $props();
</script>

<div class="context-menu" style="top: {y}px; left: {x}px" bind:this={node}>
	<ul class="context-menu_container">
		{@render items()}
	</ul>
</div>
