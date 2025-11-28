<script module>
	export const meta = {
		title: 'Eyes',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Eyes.png',
		scalable: false
	};
</script>

<script lang="ts">
	import { Window } from '$components/ui/window';

	let { windowID, zIndex, minimized = false } = $props();
</script>

<Window.Root {windowID} {zIndex} {minimized} initialSize={{ h: 140, w: 140 }}>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div class="eyeballs">
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
		</div>
	</Window.Body>
</Window.Root>

<style lang="scss">
	.eyeballs {
		display: flex;
		flex-direction: row;
	}
	.eyeball {
		position: relative;
		&_pupil {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
