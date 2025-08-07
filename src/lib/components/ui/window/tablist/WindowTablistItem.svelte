<script lang="ts">
	import type { Snippet } from 'svelte';

	let { text, children }: { text: string; children?: Snippet } = $props();

	let toggled = $state(false);
</script>

<button class="window_tablist-button" onclick={() => (toggled = !toggled)}>{text}</button>

{#if toggled}
	{@render children?.()}
{/if}
