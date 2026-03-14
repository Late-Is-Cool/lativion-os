<script lang="ts">
	import { getContext, onMount, type Snippet, tick } from 'svelte';

	interface ContextMenuProps {
		position?: {
			x: number;
			y: number;
		};
		children: Snippet;
		node?: HTMLElement;
	}
	let { position = { x: 0, y: 0 }, children, node = $bindable() }: ContextMenuProps = $props();

	let pos = $state(position);

	$effect(() => {
		pos = position;
	});

	const SubMenuContext = getContext<SubMenuContext>('submenu');
	const TabListContext = getContext<TabListMenuContext>('tablistMenu');

	onMount(async () => {
		if (!SubMenuContext || !node) return;

		const itemRect = SubMenuContext.subMenuItem().getBoundingClientRect();
		if (!itemRect) return;

		await tick();

		const menuRect = node?.getBoundingClientRect();

		let x = itemRect.right;
		let y = itemRect.top - 3;

		if (x + menuRect.width > innerWidth) {
			x = itemRect.left - menuRect.width;
		}

		if (y + menuRect.height > innerHeight - 31) {
			y = innerHeight - menuRect.height - 32;
		}

		if (TabListContext) {
			await tick();

			const windowRect = node.closest('.window')?.getBoundingClientRect();
			if (!windowRect) return;

			pos.x = x - windowRect.left;
			pos.y = y - windowRect.top;
		} else {
			pos.x = x;
			pos.y = y;
		}

		node.addEventListener('mouseover', () => SubMenuContext.isHovered(true));
	});

	onMount(async () => {
		if (!TabListContext || !node) return;

		const itemRect = TabListContext.tablistItem().getBoundingClientRect();
		if (!itemRect) return;

		const windowRect = node.closest('.window')?.getBoundingClientRect();
		if (!windowRect) return;

		pos.x = itemRect.left - windowRect.left;
		pos.y = itemRect.bottom - windowRect.top;
	});
</script>

<div class="context-menu" style="top: {pos.y}px; left: {pos.x}px" bind:this={node}>
	<ul class="context-menu_container">
		{@render children()}
	</ul>
</div>
