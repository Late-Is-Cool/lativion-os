<script module>
	export const meta = {
		title: 'Eyes',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Eyes.png',
		scalable: false
	};
</script>

<script lang="ts">
	import { Window } from '$components/ui/window';

	let { windowID, zIndex, minimized = false } = $props();

	let eyeRefs: HTMLDivElement[] = [];

	let mouse = $state({ x: 0, y: 0 });
	let transformState = $state(['translate(0, 0)', 'translate(0, 0)']);

	$effect(() => {
		transformState = eyeRefs.map((node) => {
			if (!node) return 'translate(0, 0)';

			const rect = node.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const dx = mouse.x - centerX;
			const dy = mouse.y - centerY;

			const angle = Math.atan2(dy, dx);

			const maxAtAngleX = 18 * Math.cos(angle);
			const maxAtAngleY = 38 * Math.sin(angle);
			const maxDistanceAtAngle = Math.sqrt(maxAtAngleX ** 2 + maxAtAngleY ** 2);

			const actualDistance = Math.sqrt(dx * dx + dy * dy);
			const distance = Math.min(actualDistance, maxDistanceAtAngle);

			const x = Math.cos(angle) * distance;
			const y = Math.sin(angle) * distance;

			return `translate(${x}px, ${y}px)`;
		});
	});

	const handleMouseMove = (e: MouseEvent) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};
</script>

<svelte:window onmousemove={handleMouseMove} />

<Window.Root {windowID} {zIndex} {minimized} initialSize={{ h: 140, w: 140 }}>
	<Window.TitleBar title={meta.title} icon={meta.icon}>
		<Window.MinimizeButton />
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div class="eyeballs">
			{#each [0, 1] as i}
				<div class="eyeball" bind:this={eyeRefs[i]}>
					<img
						src="/System/ImportantFiles/Programs/Eyes/Sclera.png"
						class="eyeball_sclera"
						draggable="false"
						alt=""
					/>
					<img
						src="/System/ImportantFiles/Programs/Eyes/Pupil.png"
						class="eyeball_pupil"
						draggable="false"
						style="transform: {transformState[i]}"
						alt=""
					/>
				</div>
			{/each}
		</div>
	</Window.Body>
</Window.Root>

<style lang="scss">
	.eyeballs {
		display: flex;
		flex-direction: row;
	}
	.eyeball {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		&_sclera {
			height: auto;
		}

		&_pupil {
			position: absolute;
		}
	}
</style>
