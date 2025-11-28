<script lang="ts">
	import { newPrompt } from '$lib/index.svelte';

	let { onclick = () => {} }: { onclick?: (event: MouseEvent) => void } = $props();
</script>

<button class="nodrag window_titlebar_help" {onclick}></button>
