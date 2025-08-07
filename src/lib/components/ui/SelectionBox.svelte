<script lang="ts">
	let startMouseX: number = $state(0),
		startMouseY: number = $state(0);

	let selectionHeight: number = $state(0),
		selectionWidth: number = $state(0);

	function selectionBoxHandlerDown(event: MouseEvent) {
		if (event.target !== event.currentTarget) return;
		if (event.button == 0) desktopSelect = true;
		selectionHeight = 0;
		selectionWidth = 0;
		startMouseX = event.clientX;
		startMouseY = event.clientY;
		startMenuToggle = false;
	}

	function selectionBoxHandlerMove(event: MouseEvent) {
		if (!desktopSelect) return;
		selectionWidth = event.clientX - startMouseX;
		selectionHeight = event.clientY - startMouseY;
	}

	function selectionBoxHandlerUp(event: MouseEvent) {
		event.preventDefault();
		desktopSelect = false;
		if (event.target !== event.currentTarget) return;
	}
</script>

<div
	class="selection-box"
	style="width: {Math.abs(selectionWidth)}px; height: {Math.abs(selectionHeight)}px; top: {Math.min(
		startMouseY,
		startMouseY + selectionHeight
	)}px; left: {Math.min(startMouseX, startMouseX + selectionWidth)}px;"
	hidden={!desktopSelect}
/>
