<script module>
	export const meta = {
		title: 'Browser',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Browser.png'
	};
</script>

<script lang="ts">
	import { Window } from '$components/ui/window';
	import { onMount } from 'svelte';

	let {
		windowID,
		zIndex,
		minimized,
		website = 'file:///System/ImportantFiles/Programs/Browser/landing.html'
	}: {
		windowID: number;
		zIndex: number;
		minimized: boolean;
		website: string;
	} = $props();

	let url = $state(website);

	let iframeReady = $state(false);
	let iframe: HTMLIFrameElement;

	function loadSite() {
		iframeReady = false;
		if (url.startsWith('/')) {
			url = 'file://' + url;
		} else if (!url.match(/https?:\/\/|about:|file:\/\//gm)) {
			url = 'https://' + url;
			website = url;
		}

		if (url.match(/file:\/\//gm)) website = url.replace('file://', '');
		iframe.contentWindow?.location.reload();
	}

	onMount(() => {
		loadSite();
	});

	// function loadedSite() {
	// 	iframeReady = true;
	// }
</script>

<Window.Root {windowID} {zIndex} {minimized}>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.MinimizeButton />
		<Window.MaximizeButton />
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.TabListContainer>
		<Window.TabListItem text="Help"></Window.TabListItem>
		<form style="display: flex; width: 100%">
			<input
				type="text"
				style="flex-grow: 1; min-width: 0; text-overflow: ellipsis;"
				bind:value={url}
			/>
			<button class="button" onclick={loadSite}>Go!</button>
		</form>
	</Window.TabListContainer>
	<Window.Body>
		<Window.IFrame src={website} bind:node={iframe} onload={() => (iframeReady = true)} />
	</Window.Body>
	<Window.Footer>
		{#if iframeReady}
			Done
		{:else}
			Loading {website}
		{/if}
	</Window.Footer>
	<Window.Scalable />
</Window.Root>
