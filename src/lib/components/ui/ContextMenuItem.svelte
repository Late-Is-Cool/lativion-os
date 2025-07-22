<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		onclick: MouseEventHandler<HTMLElement>;
		text: string;
		icon?: string | undefined;
	}
	let { onclick, text, icon = undefined }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li {onclick} class="context-menu_item" style="padding-left: {!icon ? '24px' : '4px'};">
	{#if icon}
		<img src={icon} alt="{text} Icon" draggable="false" />
	{/if}
	<span>{text}</span>
</li>
