<script lang="ts">
	import { minimizeRestoreWindow } from '$lib/index.svelte';
	import { getContext } from 'svelte';

	let windowContext = getContext<WindowContext>('window');
</script>

<button
	class="nodrag window_titlebar_minimize"
	onclick={() => minimizeRestoreWindow(windowContext.windowID)}
/>
