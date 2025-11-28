<script lang="ts">
	import { getContext } from 'svelte';

	let {
		minimumSize = {
			h: 150,
			w: 150
		}
	}: {
		minimumSize?: {
			h: number;
			w: number;
		};
	} = $props();

	getContext<() => void>('set-scalable')();

	let windowContext = getContext<WindowContext>('window');

	let position = windowContext.position;
	let size = windowContext.size;

	let resizing = $state(false);
	let directionDrag = $state('');
	let startMouseX = $state(0),
		startMouseY = $state(0),
		startWidth = $state(0),
		startHeight = $state(0),
		startX = $state(0),
		startY = $state(0);

	const directions = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];

	function startResize(event: MouseEvent) {
		resizing = true;

		let target = event.target as HTMLElement;
		if (target.className.includes('window_resizable-handle_')) {
			const match = target.className.match(/window_resizable-handle_(ne|nw|se|sw|n|e|s|w)/);
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
		windowContext.status.resizing = true;

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
				position.x = startX + Math.min(dragX, startWidth - minimumSize.w);
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

	$effect(() => {
		$inspect(size, position);
	});
</script>

<svelte:window
	onmousemove={(event) => moveResize(event)}
	onmouseup={() => {
		resizing = false;
		windowContext.status.resizing = false;
		directionDrag = '';
	}}
/>

{#if !getContext<WindowContext>('window').maximized()}
	{#each directions as direction}
		<div
			class="window_resizable-handle window_resizable-handle_{direction == 'se'
				? windowContext.footer() == true
					? 'se-footer'
					: 'se'
				: direction}"
			onmousedown={(event) => startResize(event)}
		></div>
	{/each}
{/if}

<!-- 
@component
 
## Scalable Window

Makes the window scalable automatically.

If there is a footer in the window, the south east corner will have a grabber icon.

- `minimumSize` - Minimum width and height for scaling { h: 0, w: 0 } default { h: 150, w: 150 }
-->
