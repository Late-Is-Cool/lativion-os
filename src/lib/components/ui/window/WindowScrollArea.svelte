<script lang="ts">
	import { type Snippet, tick } from 'svelte';

	import { ClickScrollPlugin, OverlayScrollbars as OS } from 'overlayscrollbars';
	import type { EventListenerArgs, OverlayScrollbars } from 'overlayscrollbars';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import { browser } from '$app/environment';

	let { children }: { children: Snippet } = $props();

	let onChrome = false;

	if (browser) {
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
			onChrome = true;
		}
	}

	OS.plugin(ClickScrollPlugin);

	let os: OverlayScrollbars | null = null;

	async function initializeOS(e: CustomEvent<[instance: OverlayScrollbars]>) {
		const [instance] = e.detail as EventListenerArgs['initialized'];
		os = instance;

		await tick();

		os.update();
	}
	function scrollY(amount: number) {
		if (!os) return;

		const { viewport } = os.elements();
		viewport.scrollBy({ top: amount, behavior: 'instant' });
	}

	function scrollX(amount: number) {
		if (!os) return;

		const { viewport } = os.elements();
		viewport.scrollBy({ left: amount, behavior: 'instant' });
	}
</script>

<div class="window_scrollable">
	{#if !onChrome}
		<OverlayScrollbarsComponent
			class="awesomenessscrollbar"
			on:osInitialized={initializeOS}
			options={{
				paddingAbsolute: true,
				scrollbars: { clickScroll: true, visibility: 'visible', autoHide: 'never' },
				overflow: { x: 'scroll', y: 'scroll' }
			}}
		>
			{@render children?.()}
		</OverlayScrollbarsComponent>

		<div class="h-scroll-wrapper">
			<button class="scroll-left" onclick={() => scrollX(-40)}>◄</button>
			<button class="scroll-right" onclick={() => scrollX(40)}>►</button>
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	.window_scrollable {
		flex-grow: 1;
	}
</style>
