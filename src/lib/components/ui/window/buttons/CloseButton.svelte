<script lang="ts">
	import { getContext } from 'svelte';

	let windowContext = getContext<WindowContext>('window');

	let { onclick = windowContext.closeWindow } = $props();
</script>

<button class="nodrag window_titlebar_close" {onclick} />
