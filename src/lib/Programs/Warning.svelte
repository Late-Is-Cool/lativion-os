<script module>
	export const meta = {
		title: 'Lativion OS Warning',
		icon: '/System/ImportantFiles/Brand/LativionOS-Small.png'
	};
</script>

<script>
	import Window from '$components/ui/Window.svelte';
	let { windowID, zIndex, minimized = false, initialX = 0, initialY = 0 } = $props();
</script>

<Window
	initialHeight={120}
	initialWidth={150}
	minH={120}
	{windowID}
	title={meta.title}
	icon={meta.icon}
	{zIndex}
	{minimized}
	{initialX}
	{initialY}
>
	{#snippet body()}
		<div
			style="color: black; font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%;"
		>
			<span>Everything in this site is NOT FINAL.<br />Thank you for your understanding.</span>
		</div>
	{/snippet}
</Window>
