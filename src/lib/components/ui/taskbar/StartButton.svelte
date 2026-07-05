<script lang="ts">
	import { getContext } from 'svelte';

	let {
		icon,
		text
	}: {
		icon: string;
		text?: string;
	} = $props();

	const toggles = getContext<osTogglesContext>('osToggles');
</script>

<!-- 
aria-pressed={toggles.startMenu}
onclick={(event) => {
        event.stopPropagation();
        startMenuToggle = !startMenuToggle;
        contextMenuToggle = false;
}}
-->

<button
	class="taskbar_start-button"
	aria-pressed={toggles.startMenu}
	onclick={(event) => {
		event.stopPropagation();
		toggles.startMenu = !toggles.startMenu;
		toggles.contextMenu = false;
	}}
>
	<img src={icon} alt="" aria-hidden draggable="false" />
	{#if text}
		<span>{text}</span>
	{/if}
</button>
