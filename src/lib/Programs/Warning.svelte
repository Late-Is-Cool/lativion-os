<script module>
	export const meta = {
		title: 'Lativion OS Warning',
		icon: '/System/ImportantFiles/Brand/LativionOS-Small.png'
	};
</script>

<script>
	import { Window } from '$components/ui/window';
	let { windowID, zIndex, minimized = false, initialPosition } = $props();
</script>

<Window.Root initialSize={{ h: 200, w: 240 }} {windowID} {zIndex} {minimized} {initialPosition}>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.HelpButton />
		<Window.MinimizeButton />
		<Window.MaximizeButton />
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div
			style="font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%; overflow: scroll;"
		>
			<span
				>Everything in this site is NOT FINAL.<br />Thank you for your understanding.
				<br /><br />
				P.S. Yes, the menu is indeed mostly empty, only thing working is About, and fullscreen, Sorry...
			</span>
		</div>
	</Window.Body>
	<Window.Scalable minimumSize={{ h: 120, w: 150 }} />
</Window.Root>
