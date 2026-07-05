<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let element: HTMLElement;

	onMount(() => {
		element.classList.add('animate__animated', 'animate__fadeInUp');

		element.addEventListener(
			'animationend',
			() => {
				element.classList.remove('animate__animated', 'animate__fadeInUp');
			},
			{ once: true }
		);
	});
</script>

<div class="taskbar" bind:this={element}>
	{@render children()}
</div>
