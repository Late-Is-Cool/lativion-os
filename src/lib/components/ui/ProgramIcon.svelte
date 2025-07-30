<script lang="ts">
	import { newWindow } from '$lib/index.svelte';
	import { activeWindowState, programIconsSelect } from '$stores/stores.svelte';

	let { name, icon, shortcut = false, program, programProps = {} } = $props();

	function clickHandler(event: MouseEvent) {
		event.stopPropagation();
		activeWindowState.activeWindow = null;

		const selected = programIconsSelect.includes(name);

		if (event.ctrlKey || event.shiftKey) {
			if (selected) {
				programIconsSelect.splice(programIconsSelect.indexOf(name), 1);
			} else {
				programIconsSelect.push(name);
			}
		} else {
			programIconsSelect.length = 0;
			programIconsSelect.push(name);
		}
	}
</script>

<div
	class="program-icon"
	class:program-icon_select={programIconsSelect.includes(name)}
	onclick={clickHandler}
	ondblclick={() => newWindow(program, programProps)}
>
	<div class="program-icon_container" style="--icon-url: url({icon})">
		<img class="program-icon_icon" src={icon} alt="{name} Icon" draggable="false" />
		{#if shortcut}
			<img
				class="program-icon_shortcut"
				src="/System/ImportantFiles/Shell/shortcut.png"
				alt="{name} Icon"
				draggable="false"
			/>
		{/if}
	</div>
	<span class="program-icon_title">{name}</span>
</div>
