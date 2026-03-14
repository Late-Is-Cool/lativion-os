<script lang="ts">
	import { focusWindow, minimizeRestoreWindow } from '$lib/index.svelte';
	import { activeWindowState } from '$stores/stores.svelte';

	let { windowID = 0, title = 'thing', icon = undefined } = $props();
</script>

<div
	class="taskapp"
	class:taskapp_active={activeWindowState.activeWindow === windowID}
	onclick={() => {
		if (activeWindowState.activeWindow !== windowID) {
			focusWindow(windowID);
		} else {
			minimizeRestoreWindow(windowID);
		}
	}}
>
	{#if icon}
		<img class="taskapp_icon" draggable="false" src={icon} />
	{/if}
	<span class="taskapp_title">{title}</span>
</div>
