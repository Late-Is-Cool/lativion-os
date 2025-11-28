<script lang="ts">
	import { focusWindow, removeWindow, windows } from '$lib/index.svelte';
	import { activeWindowState } from '$stores/stores.svelte';
	import { draggable } from '@neodrag/svelte';
	import { onMount, setContext, type Snippet } from 'svelte';

	interface WindowProps {
		windowID: number;
		initialPosition?: {
			x: number;
			y: number;
		};
		initialSize?: {
			h: number;
			w: number;
		};
		animations?: boolean;
		zIndex: number;
		minimized: boolean;
		children: Snippet;
	}

	let {
		windowID = 0,
		initialPosition = {
			x: 30,
			y: 30
		},
		initialSize = {
			h: 320,
			w: 480
		},
		animations = true,
		zIndex = 0,
		minimized = false,
		children
	}: WindowProps = $props();

	let position = $state(initialPosition);
	let size = $state(initialSize);

	let maximized = $state(false);
	let untransition = $state(false);

	let windowElement: HTMLElement;

	let scalable = $state(false);
	let footer = $state(false);

	setContext('set-scalable', () => {
		scalable = true;
	});

	setContext('set-footer', () => {
		footer = true;
	});

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

	let status = $state({
		moving: false,
		resizing: false,
		get idle() {
			return activeWindowState.activeWindow !== windowID;
		}
	});

	setContext('window', {
		windowID,
		maximized: () => maximized,
		position,
		size,
		closeWindow,
		handleMaximize,
		footer: () => footer,
		status,
		scalable: () => scalable
	});

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

<div
	class="window"
	class:window_maximized={maximized}
	class:window_untransition={untransition}
	class:window_minimized={minimized}
	style="height: {size.h}px; width: {size.w}px; z-index: {500 + zIndex};
		{maximized ? 'translate(0px, 0px)' : `translate: ${position.x}px ${position.y}px;`}"
	onmousedown={(event) => {
		event.stopPropagation();
		focusWindow(windowID);
	}}
	use:draggable={{
		handle: '.drag',
		cancel: '.nodrag',
		position,
		onDragStart: () => {
			status.moving = true;
		},
		onDrag: ({ offsetX, offsetY }) => {
			position.x = offsetX;
			position.y = offsetY;
		},
		onDragEnd: () => {
			status.moving = false;
		}
	}}
	bind:this={windowElement}
>
	{@render children?.()}
</div>

<!-- 
@component
 
## Window Root

The backbone of pretty much every application. It's a window!

@example
```svelte
<Window.Root>
	<Window.TitleBar title="My Window">
		<Window.CloseButton/>
	</Window.TitleBar>
	<Window.Body>
		<div>Hello!</div>
	</Window.Body>
	<Window.Scalable/>
</Window.Root>
```

- `windowID` - Window ID (don't assign)
- `position` Position when first mounted, and also reactive. { x: 0, y: 0}
- `size` Size of the window. { h: 0, w: 0 }. Default { h: 320, w: 480 }
- `animations` - Enable or disable animations when mounting or closing
- `zIndex` - zIndex for layering
- `minimized` - Toggle for minimizing purposes (don't assign)
-->
