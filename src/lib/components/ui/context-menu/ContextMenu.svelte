<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ContextMenuProps {
		x: number;
		y: number;
		children: Snippet;
		node?: HTMLElement;
	}
	let { x, y, children, node = $bindable() }: ContextMenuProps = $props();
</script>

<div class="context-menu" style="top: {y}px; left: {x}px" bind:this={node}>
	<ul class="context-menu_container">
		{@render children()}
	</ul>
</div>
