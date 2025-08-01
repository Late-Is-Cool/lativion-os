<script lang="ts">
	import { Window } from '$components/ui/window';

	let { windowID, zIndex, minimized } = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized}>
	<Window.TitleBar title="test">
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>yah</Window.Body>
</Window.Root>
