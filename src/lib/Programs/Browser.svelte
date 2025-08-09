<script lang="ts">
	import { Window } from '$components/ui/window';
	import { getContext } from 'svelte';

	let {
		windowID,
		zIndex,
		minimized,
		website = '/System/ImportantFiles/Programs/Browser/landing.html'
	}: {
		windowID: number;
		zIndex: number;
		minimized: boolean;
		website: string;
	} = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized}>
	<Window.TitleBar title="Browser">
		<Window.MinimizeButton />
		<Window.MaximizeButton />
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<iframe src={website}></iframe>
	</Window.Body>
	<Window.Footer>HELP ME</Window.Footer>
	<Window.Scalable />
</Window.Root>

<style lang="scss">
	iframe {
		width: 100%;
		height: 100%;

		background-color: white;
	}
</style>
