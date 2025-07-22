<script lang="ts">
	import { focusWindow, minimizeRestoreWindow, removeWindow, windows } from '$lib/index.svelte';
	import { activeWindowState } from '$stores/stores.svelte';
	import { draggable } from '@neodrag/svelte';
	import { onMount, type Snippet } from 'svelte';

	interface WindowProps {
		windowID: number;
		icon?: string | undefined;
		title: string;
		minimumSize?: {
			h: number;
			w: number;
		};
		initialPosition?: {
			x: number;
			y: number;
		};
		initialSize?: {
			h: number;
			w: number;
		};
		scalable?: boolean;
		maximizeButton?: boolean;
		minimizeButton?: boolean;
		helpButton?: boolean;
		animations?: boolean;
		zIndex: number;
		minimized: boolean;
		body: Snippet;
	}

	let {
		windowID = 0,
		icon = undefined,
		title = 'New window',
		minimumSize = {
			h: 150,
			w: 150
		},
		initialPosition = {
			x: 30,
			y: 30
		},
		initialSize = {
			h: 320,
			w: 480
		},
		scalable = true,
		maximizeButton = true,
		minimizeButton = true,
		helpButton = false,
		animations = true,
		zIndex = 0,
		minimized = false,
		body
	}: WindowProps = $props();

	let size = $state({ ...initialSize });

	let position = $state({ ...initialPosition });

	// resizing stuff
	let resizing = $state(false);
	let directionDrag = $state('');
	let startMouseX = $state(0),
		startMouseY = $state(0),
		startWidth = $state(0),
		startHeight = $state(0),
		startX = $state(0),
		startY = $state(0);

	let maximized = $state(false);
	let untransition = $state(false);

	let windowElement: HTMLElement;

	const directions = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];

	function startResize(event: MouseEvent) {
		resizing = true;
		if (
			event.target instanceof HTMLElement &&
			event.target.className.includes('window_resizable-handle_')
		) {
			const match = event.target.className.match(/window_resizable-handle_(ne|nw|se|sw|n|e|s|w)/);
			if (match) directionDrag = match[1];
		}

		startMouseX = event.clientX;
		startMouseY = event.clientY;
		startWidth = size.w;
		startHeight = size.h;
		startX = position.x;
		startY = position.y;
	}

	function moveResize(event: MouseEvent) {
		if (!resizing) return;

		const dragX = event.clientX - startMouseX;
		const dragY = event.clientY - startMouseY;

		let newHeight = 0;
		let newWidth = 0;

		switch (directionDrag) {
			case 'n':
				newHeight = startHeight - dragY;
				size.h = Math.max(newHeight, minimumSize.h);
				position.y = startY + Math.min(dragY, startHeight - minimumSize.h);
				break;

			case 'e':
				newWidth = startWidth + dragX;
				size.w = Math.max(newWidth, minimumSize.w);
				break;

			case 's':
				newHeight = startHeight + dragY;
				size.h = Math.max(newHeight, minimumSize.h);
				break;

			case 'w':
				newWidth = startWidth - dragX;
				size.w = Math.max(newWidth, minimumSize.w);
				position.x = startX + Math.min(dragX, startWidth - minimumSize.h);
				break;

			case 'ne':
				newHeight = startHeight - dragY;
				newWidth = startWidth + dragX;
				size.h = Math.max(newHeight, minimumSize.h);
				size.w = Math.max(newWidth, minimumSize.w);
				position.y = startY + Math.min(dragY, startHeight - minimumSize.h);
				break;

			case 'nw':
				newHeight = startHeight - dragY;
				newWidth = startWidth - dragX;
				size.h = Math.max(newHeight, minimumSize.h);
				size.w = Math.max(newWidth, minimumSize.w);
				position.y = startY + Math.min(dragY, startHeight - minimumSize.h);
				position.x = startX + Math.min(dragX, startWidth - minimumSize.w);
				break;

			case 'se':
				newHeight = startHeight + dragY;
				newWidth = startWidth + dragX;
				size.h = Math.max(newHeight, minimumSize.h);
				size.w = Math.max(newWidth, minimumSize.w);
				break;

			case 'sw':
				newHeight = startHeight + dragY;
				newWidth = startWidth - dragX;
				size.h = Math.max(newHeight, minimumSize.h);
				size.w = Math.max(newWidth, minimumSize.w);
				position.x = startX + Math.min(dragX, startWidth - minimumSize.w);
				break;
		}
	}

	function handleMaximize() {
		if (!scalable) return;

		if (maximized) {
			untransition = true;
			windowElement.addEventListener('transitionend', () => (untransition = false), {
				once: true
			});
			maximized = false;
		} else {
			maximized = true;
		}
	}

	let openAnim = $state([
		'animate__bounceIn',
		'animate__flipInX',
		'animate__jackInTheBox',
		'animate__rubberBand'
	]);
	let closeAnim = $state([
		'animate__hinge',
		'animate__bounceOutDown',
		'animate__flipOutX',
		'animate__rotateOut',
		'animate__rotateOutDownLeft',
		'animate__zoomOutDown'
	]);

	function closeWindow() {
		if (animations) {
			windowElement.classList.add(
				'animate__animated',
				closeAnim[Math.floor(Math.random() * closeAnim.length)]
			);
			windowElement.addEventListener(
				'animationend',
				() => {
					removeWindow(windowID);
				},
				{ once: true }
			);
		} else {
			removeWindow(windowID);
		}
	}

	onMount(() => {
		if (animations) {
			const randAnim = openAnim[Math.floor(Math.random() * openAnim.length)];
			windowElement.classList.add('animate__animated', randAnim);

			windowElement.addEventListener(
				'animationend',
				() => {
					windowElement.classList.remove('animate__animated', randAnim);
				},
				{ once: true }
			);
		}
	});

	$effect(() => {
		// why can i do this? well, if it works, it works i guess
		if (windows.length == 1) zIndex = 0;
	});
</script>

<svelte:window
	onmousemove={(event) => moveResize(event)}
	onmouseup={() => {
		resizing = false;
		directionDrag = '';
	}}
/>

<div
	class="window"
	class:window_maximized={maximized}
	class:window_untransition={untransition}
	class:window_minimized={minimized}
	style="height: {size.h}px; width: {size.w}px; z-index: {500 + zIndex};
		{maximized ? 'translate(0px, 0px)' : `translate: ${position.x}px ${position.y}px;`}"
	onmousedown={() => focusWindow(windowID)}
	use:draggable={{
		handle: '.drag',
		cancel: '.nodrag',
		position,
		onDrag: ({ offsetX, offsetY }) => {
			position.x = offsetX;
			position.y = offsetY;
		}
	}}
	bind:this={windowElement}
>
	<div
		class="window_titlebar"
		class:window_titlebar_active={activeWindowState.activeWindow === windowID}
		class:drag={!maximized}
		ondblclick={(event) => {
			if (
				(event.target instanceof HTMLElement &&
					event.target.classList.contains('window_titlebar_title')) ||
				event.target === event.currentTarget
			)
				handleMaximize();
		}}
	>
		{#if icon}
			<img
				src={icon}
				alt="icon"
				class="window_titlebar_icon"
				draggable="false"
				ondblclick={closeWindow}
			/>
		{/if}
		<span class="window_titlebar_title">{title}</span>
		<div class="window_titlebar_button-container">
			<button class="nodrag window_titlebar_close" onclick={closeWindow}></button>
			{#if maximizeButton}
				<button
					class="nodrag window_titlebar_{maximized ? 'maxxed' : 'maximize'}"
					disabled={!scalable}
					onclick={handleMaximize}
				></button>
			{/if}
			{#if minimizeButton}
				<button
					class="nodrag window_titlebar_minimize"
					onclick={() => minimizeRestoreWindow(windowID)}
				></button>
			{/if}
			{#if helpButton}
				<button class="nodrag window_titlebar_help"></button>
			{/if}
		</div>
	</div>
	<div class="window_body">
		{@render body()}
	</div>
	{#if scalable && !maximized}
		{#each directions as direction}
			<div
				class="window_resizable-handle window_resizable-handle_{direction}"
				onmousedown={(event) => startResize(event)}
			></div>
		{/each}
	{/if}
</div>

<!-- 
@component
 
## Window

The backbone of pretty much every application. It's a window!

@example
```svelte
<Window title="My Window">
	{#snippet body()}
		<div>Hello World!</div>
	{/snippet}
</Window>
```

- `windowID` - Window ID (don't assign)
- `icon` - Image source of your window's icon
- `title` - Title of your window
- `minH` - Minimum Height for scaling
- `minW` - Minimum width for scaling
- `initialX` - Initial X Position when first mounted
- `initialY` - Initial Y Position when first mounted
- `initialHeight` - Initial Height when first mounted
- `initialWidth` - Initial Width when first mounted
- `scalable` - If the window is scalable or not
- `maximizeButton` - Enable or disable the maximize button
- `minimizeButton` - Enable or disable the minimize button
- `helpButton` - Enable or disable the help button
- `animations` - Enable or disable animations when mounting or closing
- `zIndex` - zIndex for layering (don't assign)
- `minimized` - Toggle for minimizing purposes (don't assign)
- `body` - The inner body of the window, this is where your content lives inside
-->
