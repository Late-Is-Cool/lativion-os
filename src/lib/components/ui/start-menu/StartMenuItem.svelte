<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	interface Props {
		text: string;
		img: string;
		onclick?: () => void;
		children?: Snippet;
	}
	let { text, img, onclick, children }: Props = $props();

	let hovered: boolean = $state(false);
	let itemNode = $state<HTMLElement>();

	setContext('submenu', {
		subMenuItem: () => itemNode,
		get hovered() {
			return hovered;
		},
		isHovered: (value: boolean) => {
			hovered = value;
		}
	});
</script>

<li
	class="start-menu_item"
	class:start-menu_item_sub={children}
	{onclick}
	onmouseover={children ? () => (hovered = true) : null}
	onmouseleave={children ? () => (hovered = false) : null}
	bind:this={itemNode}
>
	<img src={img} alt="Icon" draggable="false" />
	<span>{text}</span>
</li>

{#if children && hovered}
	{@render children()}
{/if}
