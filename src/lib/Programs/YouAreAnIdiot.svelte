<script lang="ts">
	import { Window } from '$components/ui/window';

	let { windowID, zIndex, minimized } = $props();

	let position = $state({ x: 0, y: 0 });

	$effect(() => {
		let interval = setInterval(() => {
			position = { x: position.x + 5, y: position.y + 5 };
		}, 50);

		$inspect(position);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Window.Root
	{windowID}
	{zIndex}
	{minimized}
	initialPosition={position}
	initialSize={{ h: 480, w: 640 }}
>
	<Window.TitleBar
		title="Trojan.JS.YouAreAnIdiot"
		icon="/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/YouAreAnIdiot.png"
		draggable={false}
	>
		<Window.CloseButton onclick={() => {}} />
	</Window.TitleBar>
	<Window.Body>idiot</Window.Body>
</Window.Root>
