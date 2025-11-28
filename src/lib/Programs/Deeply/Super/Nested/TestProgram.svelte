<script lang="ts">
	import { Window } from '$components/ui/window';
	import { getContext } from 'svelte';

	let { windowID, zIndex, minimized } = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized}>
	{@const windowContext = getContext<WindowContext>('window')}
	<Window.TitleBar title="test">
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		Idle: {windowContext.status.idle}<br />
		Moving: {windowContext.status.moving}<br />
		Resizing: {windowContext.status.resizing}
	</Window.Body>
	<Window.Scalable />
</Window.Root>
