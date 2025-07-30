<script module>
	export const meta = {
		title: 'Lativion OS Warning',
		icon: '/System/ImportantFiles/Brand/LativionOS-Small.png'
	};
</script>

<script>
	import Window from '$components/ui/window/Window.svelte';
	let { windowID, zIndex, minimized = false, initialPosition } = $props();
</script>

<Window
	initialSize={{ h: 200, w: 240 }}
	minimumSize={{ h: 120, w: 150 }}
	{windowID}
	title={meta.title}
	icon={meta.icon}
	{zIndex}
	{minimized}
	{initialPosition}
>
	{#snippet body()}
		<div
			style="color: black; font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%; overflow: scroll;"
		>
			<span
				>Everything in this site is NOT FINAL.<br />Thank you for your understanding.
				<br /><br />
				P.S. Yes, the menu is indeed mostly empty, only thing working is About, and fullscreen, Sorry...
			</span>
		</div>
	{/snippet}
</Window>
