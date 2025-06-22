<script>
	import { screenState } from '$lib/stores/stores.svelte';

	let select = $state(0);

	/**
	 * @type {{id: number, option: string, func?: Function}[]}
	 */
	let options = $state([
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
	/**
	 * @type {{id: number, option: string, func?: Function}[]}
	 */
	let advancedOptions = $state([
		// { id: 0, option: 'Volume', type: 'toggle' },
		{
			id: 0,
			option: 'WIP',
			func() {
				console.log('hi kid');
			}
		},
		// { id: 1, option: 'Option 2' },
		{
			id: 1,
			option: 'Back',
			func() {
				optionsPage = 0;
				select = 0;
			}
		}
	]);

	let optionsPage = $state(0);

	let usingMouse = false;

	/**
	 * @param {KeyboardEvent} e
	 */
	function selectHandle(e) {
		if (e.key !== 'F11') e.preventDefault();
		usingMouse = false;
		switch (e.key) {
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

		console.log(e.key, select);
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
		<div>Version 0.05</div>
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
	<!-- <img src="https://svelte.dev/tutorial/image.gif" alt="Boot Logo" /> -->
</div>

<svelte:window onkeydown={selectHandle} />
