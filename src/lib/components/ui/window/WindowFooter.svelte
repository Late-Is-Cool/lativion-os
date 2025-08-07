<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	getContext<() => void>('set-footer')();
</script>

<div class="window_footer">
	{@render children?.()}
</div>

<!-- 
@component
 
## Window Footer

Adds a footer to your window.
-->
