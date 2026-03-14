<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	// import Self from './ContextMenuItem.svelte';

	interface Props {
		onclick: MouseEventHandler<HTMLElement>;
		text: string;
		icon?: string | null;
		disabled?: boolean | undefined;
		children?: Snippet;
	}
	let { onclick, text, icon = null, disabled = undefined, children }: Props = $props();

	let hovered: boolean = $state(false);
	let item: HTMLElement;

	setContext('submenu', {
		subMenuItem: () => item,
		get hovered() {
			return hovered;
		},
		isHovered: (value: boolean) => {
			hovered = value;
		}
	});
</script>

<li
	onclick={disabled ? null : onclick}
	class="context-menu_item"
	class:context-menu_item_sub={children}
	style="padding-left: {!icon ? '24px' : '4px'};"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	aria-disabled={disabled}
	bind:this={item}
>
	{#if icon}
		<img src={icon} alt="{text} Icon" draggable="false" />
	{/if}
	<span>{text}</span>
</li>

{#if children && hovered && !disabled}
	{@render children()}
{/if}
