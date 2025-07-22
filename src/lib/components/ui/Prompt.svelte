<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Window from './window/Window.svelte';
	import { playSound } from '$lib/util/audio';

	interface Props {
		content: Snippet;
		buttons: Snippet;
		icon: Icon;
		windowID: number;
		zIndex: number;
		title: string;
		initialPosition: { x: number; y: number };
		minimized: boolean;
	}

	let {
		content,
		buttons,
		icon,
		windowID,
		zIndex,
		title,
		initialPosition = { x: (innerWidth - 375) / 2, y: innerHeight / -120 / 2 },
		minimized
	}: Props = $props();

	type Icon = 'Error' | 'Warning' | 'Info' | 'Help';

	onMount(() => {
		if (icon === 'Error') {
			playSound('quack');
		} else {
			playSound('chord');
		}
	});
</script>

<Window
	initialSize={{ h: 120, w: 375 }}
	scalable={false}
	minimizeButton={false}
	maximizeButton={false}
	animations={false}
	{initialPosition}
	{windowID}
	{zIndex}
	{title}
	{minimized}
>
	{#snippet body()}
		<div class="prompt">
			<div class="prompt_icon">
				<img src="/System/ImportantFiles/Shell/Icons/32x32/{icon}.png" draggable="false" />
			</div>
			<div class="prompt_content">{@render content()}</div>
			<div class="prompt_buttons">
				{@render buttons()}
			</div>
		</div>
	{/snippet}
</Window>

<style lang="scss">
	.prompt {
		display: flex;
		flex-direction: row;
		height: 100px;

		padding: 10px;
		color: black;

		&_icon {
			margin-right: 10px;
		}

		&_content {
			padding: 2px;
			line-height: 1.75;
		}

		&_buttons {
			position: absolute;
			bottom: 0px;
			left: 0px;
			right: 0px;
			padding-inline: inherit;
			padding-bottom: inherit;

			display: flex;
			flex-direction: row;
			justify-content: center;
			// margin-inline: auto;
		}
	}
</style>
