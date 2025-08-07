<script module>
	export const meta = {
		title: 'Oneko',
		icon: '/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Program/Oneko.png',
		systemTray: true,
		taskApp: false
	};
</script>

<!-- TODO: THIS THING -->

<script lang="ts">
	import { onMount } from 'svelte';

	// todo
	let nekoPosX = $state(32),
		nekoPosY = $state(32),
		mousePosX = $state(0),
		mousePosY = $state(0);

	let frameCount: number = 0;
	let idleTime: number = 0;
	let idleAnimation: any = null;
	let idleAnimationFrame: number = 0;

	const nekoSpeed = 10;
	const spriteSets: Record<string, any> = {
		idle: [[0, -4]],
		alert: [[-1, -5]],
		scratchSelf: [
			[-1, -4],
			[-2, -4],
			[-3, -4]
		],
		scratchN: [
			[-4, -2],
			[-5, -2]
		],
		scratchE: [
			[0, -3],
			[-1, -3]
		],
		scratchS: [
			[-2, -3],
			[-3, -3]
		],
		scratchW: [
			[-4, -3],
			[-5, -3]
		],
		tired: [[-4, -4]],
		sleeping: [
			[-5, -4],
			[0, -5]
		],
		N: [
			[0, 0],
			[-1, 0]
		],
		E: [
			[-2, 0],
			[-3, 0]
		],
		S: [
			[-4, 0],
			[-5, 0]
		],
		W: [
			[0, -1],
			[-1, -1]
		],
		NE: [
			[-2, -1],
			[-3, -1]
		],
		NW: [
			[-4, -1],
			[-5, -1]
		],
		SE: [
			[0, -2],
			[-1, -2]
		],
		SW: [
			[-2, -2],
			[-3, -2]
		]
	};

	let backgroundPosition = $state('0px 64px');

	let onekoElement: HTMLElement;

	let lastTimestamp: number;
	function animationFrame(timestamp: number) {
		if (!onekoElement.isConnected) return;
		if (!lastTimestamp) lastTimestamp = timestamp;
		if (timestamp - lastTimestamp > 100) {
			lastTimestamp = timestamp;
			frame();
		}
		requestAnimationFrame(animationFrame);
	}

	function setSprite(name: string, frame: number) {
		const sprite = spriteSets[name][frame % spriteSets[name].length];
		backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
	}

	function idle() {
		idleTime += 1;

		if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
			let avalibleIdleAnimations = ['sleeping', 'scratchSelf'];
			if (nekoPosY < 32) {
				avalibleIdleAnimations.push('scratchN');
			}
			if (nekoPosX > window.innerWidth - 32) {
				avalibleIdleAnimations.push('scratchE');
			}
			if (nekoPosY > window.innerHeight - 32) {
				avalibleIdleAnimations.push('scratchS');
			}
			if (nekoPosX < 32) {
				avalibleIdleAnimations.push('scratchW');
			}
			idleAnimation =
				avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
		}

		switch (idleAnimation) {
			case 'sleeping':
				if (idleAnimationFrame < 8) {
					setSprite('tired', 0);
					break;
				}
				setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
				if (idleAnimationFrame > 192) {
					resetIdleFrame();
				}
				break;
			case 'scratchN':
			case 'scratchE':
			case 'scratchS':
			case 'scratchW':
			case 'scratchSelf':
				setSprite(idleAnimation, idleAnimationFrame);
				if (idleAnimationFrame > 9) {
					resetIdleFrame();
				}
				break;
			default:
				setSprite('idle', 0);
				return;
		}
		idleAnimationFrame += 1;
	}

	function resetIdleFrame() {
		idleAnimation = null;
		idleAnimationFrame = 0;
	}

	function frame() {
		frameCount += 1;

		const diffX: number = nekoPosX - mousePosX;
		const diffY: number = nekoPosY - mousePosY;
		const distance: number = Math.sqrt(diffX ** 2 + diffY ** 2);

		if (distance < nekoSpeed || distance < 48) {
			idle();
			return;
		}

		resetIdleFrame();

		if (idleTime > 1) {
			setSprite('alert', 0);
			idleTime = Math.min(idleTime, 7);
			idleTime -= 1;
			return;
		}

		let direction: string;
		direction = diffY / distance > 0.5 ? 'N' : '';
		direction += diffY / distance < -0.5 ? 'S' : '';
		direction += diffX / distance > 0.5 ? 'W' : '';
		direction += diffX / distance < -0.5 ? 'E' : '';
		setSprite(direction, frameCount);

		nekoPosX -= (diffX / distance) * nekoSpeed;
		nekoPosY -= (diffY / distance) * nekoSpeed;

		nekoPosX = Math.min(Math.max(16, nekoPosX), innerWidth - 16);
		nekoPosY = Math.min(Math.max(16, nekoPosY), innerHeight - 16);
	}

	onMount(() => {
		requestAnimationFrame(animationFrame);
	});
</script>

<svelte:window
	onmousemove={(event) => {
		mousePosX = event.clientX;
		mousePosY = event.clientY;
	}}
/>

<div
	class="oneko-overlay"
	style="top: {nekoPosY - 16}px; left: {nekoPosX - 16}px; background-position: {backgroundPosition}"
	aria-hidden
	bind:this={onekoElement}
></div>

<style type="scss">
	.oneko-overlay {
		width: 32px;
		height: 32px;
		position: fixed;
		background-image: url('/System/ImportantFiles/Programs/Oneko/oneko.png');
		pointer-events: none;
		z-index: 9993323423499;
	}
</style>
