<script lang="ts">
	import { getContext } from 'svelte';

	let windowContext = getContext<WindowContext>('window');
</script>

<button
	class="nodrag window_titlebar_{windowContext.maximized() ? 'maxxed' : 'maximize'}"
	onclick={windowContext.handleMaximize}
/>

<!-- disabled={!scalable} -->
