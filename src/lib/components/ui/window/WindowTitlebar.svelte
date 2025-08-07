<script lang="ts">
	import { activeWindowState } from '$stores/stores.svelte';
	import { getContext, type Snippet } from 'svelte';

	interface TitlebarProps {
		title: string;
		icon?: string;
		draggable?: boolean;
		children: Snippet;
	}

	let { title = 'New Window', icon, draggable = true, children }: TitlebarProps = $props();

	let windowContext = getContext<WindowContext>('window');
</script>

<div
	class="window_titlebar"
	class:window_titlebar_active={activeWindowState.activeWindow === windowContext.windowID}
	class:drag={draggable && !windowContext.maximized()}
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
		{@render children?.()}
	</div>
</div>

<!-- 
@component
 
## Window Titlebar

- `title` - **REQUIRED** The title of your window.
- `icon` - Relative path to the icon image (16x16).
-->
