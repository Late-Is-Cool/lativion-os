<script module>
	export const meta = {
		title: 'Test Program'
	};
</script>

<script lang="ts">
	import { SelectionBox } from '$components/ui/selection';
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
		<span>Idle: {windowContext.status.idle}</span><br />
		<span>Moving: {windowContext.status.moving}</span><br />
		<span>Resizing: {windowContext.status.resizing}</span>
		<div style="width: 50%; height: 50%; background-color: aqua;">
			<SelectionBox.Root>ye</SelectionBox.Root>
		</div>
		<SelectionBox.Root>ye</SelectionBox.Root>
	</Window.Body>
	<Window.Scalable />
</Window.Root>
