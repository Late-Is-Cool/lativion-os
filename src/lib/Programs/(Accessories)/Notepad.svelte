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
		<Window.TabListItem text="Edit">
			<ContextMenu.Root>
				<ContextMenu.Item text="god help me" onclick={() => {}} />
			</ContextMenu.Root>
		</Window.TabListItem>
		<Window.TabListItem text="Help">
			<ContextMenu.Root>
				<ContextMenu.Item text="There is no help for you!" onclick={() => {}}>
					<ContextMenu.Root>
						<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
						<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
						<ContextMenu.Item text="hahahaha!" onclick={() => {}}>
							<ContextMenu.Root>
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
								<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
							</ContextMenu.Root>
						</ContextMenu.Item>
						<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
						<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
						<ContextMenu.Item text="hahahaha!" onclick={() => {}} />
					</ContextMenu.Root>
				</ContextMenu.Item>
			</ContextMenu.Root>
		</Window.TabListItem>
	</Window.TabList>
	<Window.Body>
		<Window.ScrollArea>
			<div class="notepad" contenteditable="plaintext-only" role="textbox" aria-multiline="true">
				{content}
			</div>
		</Window.ScrollArea>
	</Window.Body>
	<Window.Footer>{file ? `D:${file}` : 'Untitled'}</Window.Footer>
	<Window.Scalable />
</Window.Root>

<style lang="scss">
	:global {
		.awesomenessscrollbar {
			--os-handle-interactive-area-offset: 25px;

			flex: 1;
			padding-right: 16px;
			padding-bottom: 16px;
		}
		.os-scrollbar {
			--os-size: 16px;
			--os-handle-perpendicular-size: 80%;

			padding: 0;

			&-vertical {
				&::before {
					content: 'sup boi';
				}

				&::after {
					content: 'i love fa';
				}
			}
		}
		.os-scrollbar-track {
			border-radius: 0;

			&,
			&:hover {
				background: repeating-conic-gradient(silver 0 25%, white 25% 50%);
				background-size: 2px 2px;
				transition: none !important;
			}
		}

		.os-scrollbar-handle {
			border-radius: 0 !important;
			transition: none !important;

			&,
			&:active,
			&:hover {
				background: silver;
				opacity: 1 !important;
				box-shadow:
					inset 1px 1px white,
					inset -1px -1px black,
					inset 2px 2px #dfdfdf,
					inset -2px -2px gray;
			}
		}
	}
	.scroll-wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		width: 100%;

		background: none;

		box-shadow:
			inset -1px -1px white,
			inset 1px 1px gray,
			inset -2px -2px #dfdfdf,
			inset 2px 2px black;
	}

	.h-scroll-wrapper {
		display: flex;
		justify-content: flex-start;
		margin-top: 2px;
	}

	.scroll-btn {
		width: 16px;
		height: 16px;
		background: #c0c0c0;
		border: none;
		cursor: pointer;
		padding: 0;
		font-size: 10px;
		line-height: 14px;
		text-align: center;

		/* Windows 98 bevel effect */
		box-shadow:
			inset -1px -1px #808080,
			inset 1px 1px #ffffff,
			inset -2px -2px #404040,
			inset 2px 2px #dfdfdf;
	}

	.scroll-btn:active {
		box-shadow:
			inset 1px 1px #808080,
			inset -1px -1px #ffffff,
			inset 2px 2px #404040,
			inset -2px -2px #dfdfdf;
	}
	.notepad {
		// box-shadow:
		// 	inset -1px -1px white,
		// 	inset 1px 1px gray,
		// 	inset -2px -2px #dfdfdf,
		// 	inset 2px 2px black;

		z-index: -50;

		min-width: max-content;
		min-height: 100%;

		background-color: white;

		padding: 5px;

		overflow: auto;

		white-space: pre;

		font-family: 'Ubuntu Mono';
		line-height: 1;
		font-size: 14px;

		&:focus {
			outline: none;
		}
	}
</style>
