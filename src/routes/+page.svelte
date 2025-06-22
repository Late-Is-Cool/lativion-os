<script>
	import { screenState } from '$lib/stores/stores.svelte';

	import BootScreen from '$lib/screens/BootScreen.svelte';
	import BootPrepare from '$lib/screens/BootPrepare.svelte';
	import BootLaunch from '$lib/screens/BootLaunch.svelte';
	import OperatingSystem from '$lib/screens/OperatingSystem.svelte';

	// ? looks better than an if/else statement

	let screens = [BootScreen, BootPrepare, BootLaunch, OperatingSystem];

	let ScreenComponent = $derived(screens[screenState.screen]);
</script>

<ScreenComponent />
