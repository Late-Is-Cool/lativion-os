<script module>
	export const meta = {
		title: 'Notepad',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Notepad.png'
	};
</script>

<script lang="ts">
	import { Window } from '$components/ui/window';
	import { ContextMenu } from '$components/ui/context-menu/index';
	import { onMount } from 'svelte';

	let { windowID, zIndex, minimized = false, file = '' } = $props();

	const windowHeight = 400;
	const windowWidth = 650;

	let content = $state('');

	onMount(async () => {
		if (file == '') return;
		content = await fetch(file)
			.then((res) => res.text())
			.catch(() => 'FAILED TO LOAD FILE.');
	});
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
	<Window.TabList>
		<Window.TabListItem text="File">
			<ContextMenu.Root>
				<ContextMenu.Item text="Open File" onclick={() => {}} />
			</ContextMenu.Root>
		</Window.TabListItem>
		<!-- <Window.TabListItem text="Edit">
			<ContextMenu.Root>
				<ContextMenu.Item text="god help me" onclick={() => {}} />
			</ContextMenu.Root>
		</Window.TabListItem> -->
		<Window.TabListItem text="Help">
			<ContextMenu.Root>
				<ContextMenu.Item text="About Notepad" onclick={() => {}} />
			</ContextMenu.Root>
		</Window.TabListItem>
	</Window.TabList>
	<Window.Body>
		<!-- <Window.ScrollArea> -->
		<div class="notepad">
			<textarea>{content}</textarea>
		</div>
		<!-- </Window.ScrollArea> -->
	</Window.Body>
	<Window.Footer>{file ? `D:${file}` : 'Untitled'}</Window.Footer>
	<Window.Scalable />
</Window.Root>

<style lang="scss">
	.notepad {
		height: 100%;
		width: 100%;

		textarea {
			box-shadow:
				inset -1px -1px white,
				inset 1px 1px gray,
				inset -2px -2px #dfdfdf,
				inset 2px 2px black;
			width: 100%;
			height: inherit;
			resize: none;

			padding: 5px;

			font-family: 'Ubuntu Mono';
			line-height: 1;
			font-size: 14px;

			&:focus {
				outline: none;
			}
		}
	}
</style>
