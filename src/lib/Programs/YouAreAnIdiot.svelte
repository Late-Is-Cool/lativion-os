<script lang="ts">
	import { Window } from '$components/ui/window/index';

	let { windowID, zIndex, minimized } = $props();

	let position = $state({ x: 0, y: 0 });

	// $effect(() => {
	// 	let interval = setInterval(() => {
	// 		position = { x: position.x + 5, y: position.y + 5 };
	// 	}, 500);

	// 	$inspect(position);

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// });
</script>

<Window.Root {windowID} {zIndex} {minimized} initialPosition={position}>
	<Window.TitleBar
		title="Trojan.JS.YouAreAnIdiot"
		icon="/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/YouAreAnIdiot.png"
		draggable={false}
	>
		<Window.CloseButton onclick={() => {}} />
	</Window.TitleBar>
	<Window.Body>Obama</Window.Body>
</Window.Root>
