<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();

	let container: HTMLDivElement;

	let startMouseX = $state(0),
		startMouseY = $state(0);

	let selectionHeight = $state(0),
		selectionWidth = $state(0);

	let selecting = $state(false);

	function localCoords(event: MouseEvent) {
		const rect = container.getBoundingClientRect();

		const rawX = event.clientX - rect.left;
		const rawY = event.clientY - rect.top;

		return {
			x: Math.max(0, Math.min(rawX, rect.width)),
			y: Math.max(0, Math.min(rawY, rect.height))
		};
	}

	function selectionBoxHandlerDown(event: MouseEvent) {
		if (event.target !== event.currentTarget || event.button !== 0) return;

		const pos = localCoords(event);
		startMouseX = pos.x;
		startMouseY = pos.y;

		selectionHeight = 0;
		selectionWidth = 0;
		selecting = true;

		window.addEventListener('mouseup', selectionBoxHandlerUp);
	}

	function selectionBoxHandlerMove(event: MouseEvent) {
		if (!selecting) return;

		const pos = localCoords(event);

		selectionHeight = pos.x - startMouseX;
		selectionWidth = pos.y - startMouseY;
	}

	function selectionBoxHandlerUp() {
		selecting = false;
		window.removeEventListener('mouseup', selectionBoxHandlerUp);
	}
</script>

<svelte:window onmousedown={selectionBoxHandlerDown} onmousemove={selectionBoxHandlerMove} />

<div
	bind:this={container}
	class="selection-container"
	onmousedown={selectionBoxHandlerDown}
	onmousemove={selectionBoxHandlerMove}
	style="width: 100%; height: 100%; position: relative;"
>
	<div
		class="selection-box"
		hidden={!selecting}
		style="
      width: {Math.abs(selectionHeight)}px;
      height: {Math.abs(selectionWidth)}px;
      left: {Math.min(startMouseX, startMouseX + selectionHeight)}px;
      top: {Math.min(startMouseY, startMouseY + selectionWidth)}px;
    "
	/>

	{@render children?.()}
</div>
