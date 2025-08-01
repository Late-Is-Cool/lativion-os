<script module>
	import { Window } from '$components/ui/window';

	export const meta = {
		title: 'Eyes',
		icon: '/System/ImportantFiles/Shell/Icons/16x16/Program/Eyes.png',
		scalable: false
	};
</script>

<script lang="ts">
	import { TitleBar } from '$components/ui/window/exports';

	let { windowID, zIndex, minimized = false } = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized} scalable={false} initialSize={{ h: 140, w: 142 }}>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
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
	</Window.Body>
</Window.Root>

<style lang="scss">
	.eyeball {
		display: flex;
		.pupil {
			position: absolute;
		}
	}
</style>
