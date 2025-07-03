<script module>
	export const meta = {
		title: 'Notepad',
		icon: '/System/ImportantFiles/Shell/Icons/16x16/Notepad.png'
	};
</script>

<script>
	import Window from '$components/ui/Window.svelte';
	let { windowID, zIndex, minimized = false, content = '' } = $props();

	let windowHeight = 400;
	let windowWidth = 650;
</script>

<Window
	{windowID}
	title={meta.title}
	icon={meta.icon}
	{zIndex}
	{minimized}
	initialX={(window.innerWidth - windowWidth) / 2}
	initialY={(window.innerHeight - windowHeight) / 2}
	initialHeight={windowHeight}
	initialWidth={windowWidth}
>
	{#snippet body()}
		<div class="notepad">
			<div class="window_menubar">
				<button class="window_menubar_button">File</button>
				<button class="window_menubar_button">Edit</button>
				<button class="window_menubar_button">Help</button>
			</div>
			<textarea>{content}</textarea>
		</div>
	{/snippet}
</Window>

<style lang="scss">
	@use '../../../styles/variables.scss' as *;

	.notepad {
		height: 100%;
		width: 100%;

		display: flex;
		flex-direction: column;

		textarea {
			width: 100%;
			height: inherit;
			resize: none;
			padding: 2px;

			font-family: 'Ubuntu Mono';
			line-height: 1;
			font-size: 14px;
			&::selection {
				background-color: $accent-color;
				color: white;
			}

			&:focus {
				outline: none;
			}
		}
	}
</style>
