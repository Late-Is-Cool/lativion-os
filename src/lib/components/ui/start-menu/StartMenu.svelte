<script lang="ts">
	import type { Snippet } from 'svelte';

	interface StartMenuProps {
		children: Snippet;
	}
	let { children }: StartMenuProps = $props();
</script>

<div class="start-menu">
	{@render children?.()}
</div>
