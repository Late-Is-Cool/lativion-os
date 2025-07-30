<script lang="ts">
	import { screenState } from '$stores/stores.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let overlay: boolean = $state(true);

	let stupidVar: string = $state('-Empty');

	onMount(async () => {
		overlay = false;
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 2400 + 5000));
		overlay = !overlay;
	});
</script>

<div class="bootlaunch">
	<div class="bootlaunch_logo">
		<div>
			<img src="/System/ImportantFiles/Brand/LativionOS-Boot.png" alt="Lativion OS Logo" />
		</div>
	</div>
	<div>
		<img src="/System/ImportantFiles/Shell/Loading{stupidVar}.gif" alt="Loading Bar" />
	</div>
	<div class="bootlaunch_otherlogo">
		<img src="/System/ImportantFiles/Brand/LateTheIdiot-White.png" alt="LateTheIdiot" />
	</div>
</div>

{#if overlay}
	<div
		class="fade-overlay"
		transition:fade={{ duration: 500 }}
		onoutroend={() => (stupidVar = '')}
		onintroend={() => {
			screenState.screen = 3;
		}}
	></div>
{/if}
