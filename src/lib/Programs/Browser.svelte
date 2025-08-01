<script lang="ts">
	import { Window } from '$components/ui/window';

	let {
		windowID,
		zIndex,
		minimized,
		website = 'about:blank'
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
</Window.Root>

<style lang="scss">
	iframe {
		width: 100%;
		height: 100%;
	}
</style>
