<script lang="ts">
	import BootLoadingBar from '$components/ui/BootLoadingBar.svelte';
	import { screenState } from '$stores/stores.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let overlay: boolean = $state(true);

	onMount(async () => {
		overlay = false;
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 2400 + 5000));
		overlay = !overlay;
	});
</script>

<div class="bootlaunch">
	<div class="bootlaunch_logo">
		<img src="/System/ImportantFiles/Brand/LativionOS-Boot.svg" alt="Lativion OS Logo" />
	</div>

	<BootLoadingBar />

	<div class="bootlaunch_otherlogo">
		<img src="/System/ImportantFiles/Brand/LateTheIdiot-White.svg" alt="LateTheIdiot" />
	</div>
</div>

{#if overlay}
	<div
		class="fade-overlay"
		transition:fade={{ duration: 500 }}
		onintroend={() => {
			screenState.screen = 3;
		}}
	></div>
{/if}

<!--  -->
