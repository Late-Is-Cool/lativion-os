<script lang="ts">
	import { focusWindow, removeWindow, windows } from '$lib/index.svelte';
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
		scalable?: boolean;
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

	let size = $state(initialSize);

	let position = $state(initialPosition);

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

	setContext('window', {
		windowID,
		maximized: () => maximized,
		position,
		size,
		closeWindow,
		handleMaximize,
		footer: () => footer
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
- `initialPosition` Initial position when first mounted { x: 0, y: 0}
- `initialSize` Initial size when first mounted { h: 0, w: 0 }. Default { h: 320, w: 480 }
- `animations` - Enable or disable animations when mounting or closing
- `zIndex` - zIndex for layering
- `minimized` - Toggle for minimizing purposes (don't assign)
-->
