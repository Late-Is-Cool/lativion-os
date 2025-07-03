<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { screenState } from '$stores/stores.svelte';

	let hexcode = $state('#0000AA');

	if (String(page.status).startsWith('4')) {
		hexcode = '#0000AA';
	} else if (String(page.status).startsWith('5')) {
		hexcode = '#AA0000';
	}

	function handle(event: MouseEvent | KeyboardEvent) {
		event.preventDefault();
		goto('/');
		screenState.screen = 0;
	}
</script>

<div class="errorpage" style="background-color: {hexcode};">
	<div class="errorpage_container">
		<div class="errorpage_title" style="color: {hexcode};">Lativion OS</div>
		<div>An error has occured. The OS has shut down to prevent any further problems.</div>
		<div>
			Maybe it just had a bad day and wanted to <i>crash</i> out? However, any unsaved work in any application
			has been lost, unfortunately. Nothing we can do.
		</div>
		<div>For further inforation, look at the error code below.</div>
		<div>Error: {page.status}: {page.error?.message}</div>
		<div style="align-self: center;">
			Press any key to continue <span class="blink">_</span>
		</div>
	</div>
</div>

<svelte:window onkeydown={handle} onclick={handle} />

<style>
	@keyframes blink-anim {
		to {
			visibility: hidden;
		}
	}
	.blink {
		animation: blink-anim 1s steps(2, start) infinite;
	}
</style>
