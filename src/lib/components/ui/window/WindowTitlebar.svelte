<script lang="ts">
	import { activeWindowState } from '$stores/stores.svelte';
	import { getContext, type Snippet } from 'svelte';

	interface TitlebarProps {
		icon?: string;
		title: string;
		children: Snippet;
	}

	let { icon, title = 'New Window', children }: TitlebarProps = $props();

	let windowContext = getContext<WindowContext>('window');
</script>

<div
	class="window_titlebar"
	class:window_titlebar_active={activeWindowState.activeWindow === windowContext.windowID}
	class:drag={!windowContext.maximized()}
	ondblclick={(event) => {
		if (
			(event.target instanceof HTMLElement &&
				event.target.classList.contains('window_titlebar_title')) ||
			event.target === event.currentTarget
		)
			windowContext.handleMaximize();
	}}
>
	{#if icon}
		<img
			src={icon}
			alt="icon"
			class="window_titlebar_icon"
			draggable="false"
			ondblclick={windowContext.closeWindow}
		/>
	{/if}
	<span class="window_titlebar_title">{title}</span>
	<div class="window_titlebar_button-container">
		<!--
			{#if helpButton}
				<button class="nodrag window_titlebar_help"></button>
			{/if} -->
		{@render children?.()}
	</div>
</div>
