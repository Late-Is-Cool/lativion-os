<script module>
	import { Window } from '$components/ui/window';

	export const meta = {
		title: "Webrings that I'm apart of"
	};
</script>

<script lang="ts">
	let {
		windowID,
		zIndex,
		minimized
	}: {
		windowID: number;
		zIndex: number;
		minimized: boolean;
	} = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized} initialSize={{ w: 500, h: 500 }}>
	<Window.TitleBar title={meta.title}>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<script src="https://webring.kiwi2.xyz/embed.js" data-username="latetheidiot"></script>
	</Window.Body>
	<Window.Scalable />
</Window.Root>
