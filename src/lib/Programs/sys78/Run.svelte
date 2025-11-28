<script module>
	export const meta = {
		title: 'Run',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Run.png'
	};
</script>

<script lang="ts">
	import { Window } from '$components/ui/window';
	import { newWindow, newPrompt } from '$lib/index.svelte';
	import { getContext, onMount } from 'svelte';

	let { windowID, zIndex, minimized } = $props();

	let inputValue = $state('');

	function run() {
		newWindow(inputValue).catch((err) => newPrompt('Error', 'Run: Invalid Program', `${err}`));
	}

	let focus: HTMLElement;

	onMount(() => {
		focus.focus();
	});
</script>

<Window.Root
	{windowID}
	{zIndex}
	{minimized}
	initialSize={{ h: 140, w: 280 }}
	initialPosition={{ x: 20, y: innerHeight - 190 }}
>
	<Window.TitleBar icon={meta.icon} title={meta.title}>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<form class="run">
			<div class="run_top">
				<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Run.png" alt="Run Icon" />
				<span>Type the name of a program and Lativion OS will open it for you.</span>
			</div>
			<div class="run_prompt">
				<span>Open:</span>
				<input bind:value={inputValue} type="text" bind:this={focus} />
			</div>
			<div class="run_buttons">
				<button class="button" onclick={run}>OK</button>
				<button class="button" onclick={getContext<WindowContext>('window').closeWindow}
					>Cancel</button
				>
			</div>
		</form>
	</Window.Body>
</Window.Root>

<style lang="scss">
	.run {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		padding: 10px;

		&_top {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}

		&_prompt {
			display: flex;
			align-items: center;
			gap: 8px;

			input {
				width: 100%;
			}
		}

		&_buttons {
			width: 100%;
			display: flex;
			gap: 4px;
			justify-content: flex-end;
		}
	}
</style>
