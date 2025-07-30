<script module>
	import Window from '$components/ui/window/Window.svelte';
	import { onMount } from 'svelte';

	export const meta = {
		title: 'Eyes',
		icon: '/System/ImportantFiles/Shell/Icons/16x16/Program/Eyes.png'
		// scalable: false
	};
</script>

<script lang="ts">
	let { windowID, zIndex, minimized = false } = $props();
</script>

<Window
	{windowID}
	title={meta.title}
	icon={meta.icon}
	{zIndex}
	{minimized}
	helpButton
	maximizeButton={false}
	scalable={false}
	initialSize={{ h: 140, w: 142 }}
>
	{#snippet body()}
		<div class="eyeball">
			<img
				src="/System/ImportantFiles/Programs/Eyes/Sclera.png"
				class="eyeball_sclera"
				draggable="false"
			/>
			<img
				src="/System/ImportantFiles/Programs/Eyes/Pupil.png"
				class="eyeball_pupil"
				draggable="false"
			/>
		</div>
	{/snippet}
</Window>

<style lang="scss">
	.eyeball {
		display: flex;
		.pupil {
			position: absolute;
		}
	}
</style>
