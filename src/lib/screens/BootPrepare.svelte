<script lang="ts">
	import { screenState } from '$stores/stores.svelte';
	import { onMount } from 'svelte';

	let visibleArray: { text: String; status?: String; style?: string; func?: Function }[] = $state(
		[]
	);

	let time: string = '';

	let bootPrepare: Element;

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
				text: `CPU Cores/Threads: ${window.navigator.hardwareConcurrency}`,
				style: 'color: aqua;'
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
				text: 'AD:',
				style: 'color: aqua; white-space: pre-line;',
				func() {
					const adPlacement = [
						'Slow download speeds? Use ZapGrab!',
						'Looking for jobs? Raytruxian Inc is hiring!',
						'Tired of using the default browser? WebScrape is the better alternative for your surfing needs!'
					];
					this.text = `${this.text} ${adPlacement[Math.floor(Math.random() * adPlacement.length)]}\n(Don't want advertisements? Upgrade to Lativion OS Proper! Only $49.99 USD)`;
				}
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
				text: 'LOW AMOUNT OF RAM!!!',
				status: 'warning'
			},
			{
				text: 'Downloading more RAM....',
				style: 'color: yellow;'
			},
			{
				text: 'RAM downloaded!',
				style: 'color: lime;',
				func() {
					const byteSize = ['MB', 'GB', 'TB'];

					const number = (Math.floor(Math.random() * 10) + 1) * 8;

					this.text = `${this.text} (${number} ${byteSize[Math.floor(Math.random() * byteSize.length)]})`;
				}
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

				bootPrepare.scrollTop = bootPrepare.scrollHeight;
				if (visibleArray.length == array.length) {
					screenState.screen = 2;
				}
			}
		}

		loadArray();
	});
</script>

<div class="bootprepare" bind:this={bootPrepare}>
	<!-- <div> -->
	{#each visibleArray as item}
		<div class="bootprepare_message">
			{#if item?.status}
				<div>
					[<span
						style={item.status == 'failed' ||
						item.status == 'exploded' ||
						item.status.match(/warning/gi)
							? 'color: red;'
							: 'color: lime'}>{item.status.toUpperCase()}</span
					>]
				</div>
			{/if}
			<span style={item?.style}>{item.text}</span>
		</div>
	{/each}
	<!-- </div> -->
</div>
