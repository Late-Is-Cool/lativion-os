<script lang="ts">
	import { screenState } from '$stores/stores.svelte.js';

	import BootScreen from '$lib/screens/BootScreen.svelte';
	import BootPrepare from '$lib/screens/BootPrepare.svelte';
	import BootLaunch from '$lib/screens/BootLaunch.svelte';
	import OperatingSystem from '$lib/screens/OperatingSystem.svelte';
	import Shutdown from '$screens/Shutdown.svelte';
	import { setContext } from 'svelte';
	import { page } from '$app/state';

	// ? looks better than an if/else statement
	let screens = [BootScreen, BootPrepare, BootLaunch, OperatingSystem, Shutdown];

	setContext('version', page.data.version);

	let ScreenComponent = $derived(screens[screenState.screen]);
</script>

<ScreenComponent />
