<script lang="ts">
	let { children } = $props();
</script>

<div class="window_body">
	{@render children()}
</div>

<!-- 
@component
 
## Window Body

Where the actual functionality comes in.

-->
