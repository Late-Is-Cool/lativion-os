<script module>
	export const meta = {
		title: 'Notepad',
		icon: '/System/ImportantFiles/Shell/Icons/16x16/Program/Notepad.png'
	};
</script>

<script>
	import { Window } from '$components/ui/window';
	let { windowID, zIndex, minimized = false, content = '' } = $props();

	let windowHeight = 400;
	let windowWidth = 650;
</script>

<Window.Root
	{windowID}
	{zIndex}
	{minimized}
	initialPosition={{ x: (innerWidth - windowWidth) / 2, y: (innerHeight - windowHeight) / 2 }}
	initialSize={{ h: windowHeight, w: windowWidth }}
>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.MinimizeButton />
		<Window.MaximizeButton />
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div class="notepad">
			<!-- <div class="window_menubar">
				<button class="window_menubar_button">File</button>
				<button class="window_menubar_button">Edit</button>
				<button class="window_menubar_button">Help</button>
			</div> -->
			<textarea>{content}</textarea>
		</div>
	</Window.Body>
</Window.Root>

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
