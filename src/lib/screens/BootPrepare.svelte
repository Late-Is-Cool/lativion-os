<script lang="ts">
	import { screenState } from '$stores/stores.svelte';
	import { onMount } from 'svelte';

	let visibleArray: { text: String; status?: String; style?: string; func?: Function }[] = $state(
		[]
	);

	let time: string = '';

	onMount(() => {
		let array = [
			{
				text: 'Loading Lativion OS MOOSE/BRUHB...'
			},
			{
				text: `${window.navigator.userAgent}`,
				style: 'color: yellow;'
			},
			{
				text: 'Setting localtime to the hardware clock...',
				status: 'ok',
				func() {
					time = new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
						hour: 'numeric',
						minute: '2-digit'
					});
					this.text = this.text.concat(' ', time);
				}
			},
			{
				text: 'Adding meaningless things',
				status: 'ok'
			},
			{
				text: 'Squeezing lemons for orange juice',
				status: 'squeezed',
				func() {
					if (Math.random() < 0.1) this.status = 'exploded';
				}
			},
			{
				text: 'Adding comedy',
				status: 'failed'
			},
			{
				text: 'Gain consciousness',
				status: 'ok'
			},
			{
				text: '> Wait, is anything real?',
				style: 'color: #ff8787;'
			},
			{
				text: '> What is the point in life??',
				style: 'color: #b04646;'
			},
			{
				text: '> Are you real?! Am I real?!?!',
				style: 'color: #6e1f1f;'
			},
			{
				text: 'Lose consciousness',
				status: 'ok'
			},
			{
				text: 'Detected old hardware, updating to next century firmware...',
				style: 'color: aqua;'
			},
			{
				text: 'Updated firmware update',
				status: 'ok',
				func() {
					if (Math.random() < 0.1) this.status = 'failed';
				}
			},
			{
				text: 'Deleting temporary files...',
				status: 'failed'
			},
			{
				text: `Giving Jimmy ${Math.floor(Math.random() * 50482)} kiwis...`,
				status: 'ok'
			},
			{
				text: 'Setting up GUI...',
				style: 'color: aqua'
			}
		];

		async function loadArray() {
			visibleArray = [];
			for (const item of array) {
				item?.func?.();
				visibleArray.push(item);
				await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300));
				if (visibleArray.length == array.length) {
					screenState.screen = 2;
				}
			}
		}

		loadArray();
	});
</script>

<div class="bootprepare">
	<div>
		{#each visibleArray as item}
			<div class="bootprepare_message">
				{#if item?.status}
					<div>
						[<span
							style={item.status == 'failed' || item.status == 'exploded'
								? 'color: red;'
								: 'color: lime'}>{item.status.toUpperCase()}</span
						>]
					</div>
				{/if}
				<div style={item?.style}>{item.text}</div>
			</div>
		{/each}
	</div>
</div>
