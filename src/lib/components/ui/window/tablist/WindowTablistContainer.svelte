<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let tabListItemIndex = 0;

	let active = $state<number | null>(null);

	setContext('tablist', {
		register: () => {
			return tabListItemIndex++;
		},
		activate: (index: number | null) => {
			active = index;
		},
		isActive: (index: number | null) => {
			return active === index;
		}
	});
</script>

<div>{@render children()}</div>
