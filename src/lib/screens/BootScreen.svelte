<script lang="ts">
	import { screenState, config } from '$stores/stores.svelte';

	let select: number = $state(0);

	type option = {
		id: number;
		option: string;
		toggleOpt?: boolean;
		toggled?: boolean;
		func?: Function;
	};

	let options: option[] = $state([
		{
			id: 0,
			option: 'Lativion OS MOOSE/BRUHB',
			func() {
				screenState.screen = 1;
			}
		},
		{
			id: 1,
			option: 'Lativion OS MOOSE/BRUHB (Fast Boot)',
			func() {
				screenState.screen = 3;
			}
		},
		{
			id: 2,
			option: 'Advanced options for Lativion OS MOOSE/BRUHB',
			func() {
				optionsPage = 1;
				select = 0;
			}
		}
	]);

	let advancedOptions: option[] = $state([
		{
			id: 0,
			option: 'Volume',
			toggleOpt: true,
			toggled: config.volume,
			func() {
				config.volume = !config.volume;
				this.toggled = config.volume;
			}
		},
		{
			id: 1,
			option: 'Fullscreen',
			toggleOpt: true,
			toggled: config.fullscreen,
			func() {
				const documentElement = document.documentElement;
				if (!config.fullscreen) {
					documentElement.requestFullscreen?.();
				} else {
					document.exitFullscreen?.();
				}
				config.fullscreen = !config.fullscreen;
				this.toggled = config.fullscreen;
			}
		},
		{
			id: 2,
			option: 'Back',
			func() {
				optionsPage = 0;
				select = 0;
			}
		}
	]);

	let optionsPage: number = $state(0);

	let usingMouse: boolean = false;

	function selectHandle(event: KeyboardEvent) {
		event.preventDefault();
		usingMouse = false;
		switch (event.key) {
			case 'ArrowUp':
				if (optionsPage === 0) {
					select = select <= 0 ? options.length - 1 : select - 1;
				} else {
					select = select <= 0 ? advancedOptions.length - 1 : select - 1;
				}
				break;

			case 'ArrowDown':
				if (optionsPage === 0) {
					select = select >= options.length - 1 ? 0 : select + 1;
				} else {
					select = select >= advancedOptions.length - 1 ? 0 : select + 1;
				}
				break;

			case 'Enter':
				selectOption();
		}
	}

	function selectOption() {
		// incredibly jank, will fix never
		if (optionsPage == 0) {
			options[select]?.func?.();
		} else {
			advancedOptions[select]?.func?.();
		}
	}
</script>

<div class="bootscreen">
	<div class="bootscreen_title">
		<div>MOOSE BRUHB</div>
		<div>Version 0.3.0</div>
	</div>

	<div class="bootscreen_optionsContainer">
		{#each optionsPage === 0 ? options : advancedOptions as option}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="bootscreen_option"
				class:bootscreen_optionSelect={option.id == select}
				onmouseenter={() => {
					select = option.id;
					usingMouse = true;
				}}
				onclick={selectOption}
			>
				<span class:bootscreen_arrow={option.id != select}>▶</span>
				<span>
					{option.option}
				</span>
				{#if option?.toggleOpt}
					<span
						>[<span style="color: {option?.toggled ? 'lime' : 'red'}"
							>{String(option?.toggled)?.toUpperCase()}</span
						>]</span
					>
				{/if}
			</div>
		{/each}
	</div>
	<span>
		Use the ↑ and ↓ keys to select which entry is highlighted.
		<br />
		Press enter to boot the selected OS.
		<br />
		Alternatively, use your mouse to select an entry.
	</span>
</div>

<svelte:window onkeydown={selectHandle} />
