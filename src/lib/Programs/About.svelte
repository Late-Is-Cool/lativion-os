<script module>
	export const meta = {
		title: 'About Lativion OS',
		scalable: false
	};
</script>

<script>
	import { Window } from '$components/ui/window';
	import { newWindow, removeWindow } from '$lib/index.svelte';

	let { windowID, zIndex, minimized = false } = $props();

	let windowHeight = 380;
	let windowWidth = 450;
</script>

<Window.Root
	{windowID}
	initialPosition={{ x: (innerWidth - windowWidth) / 2, y: (innerHeight - windowHeight) / 2 }}
	initialSize={{ h: windowHeight, w: windowWidth }}
	scalable={meta.scalable}
	animations={false}
	{zIndex}
	{minimized}
>
	<Window.TitleBar title={meta.title}>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div class="about">
			<div class="about_brand">
				<img
					src="/System/ImportantFiles/Brand/LateTheIdiot.png"
					alt="LateTheIdiot"
					class="about_comp-image"
					draggable="false"
				/>
				<img
					src="/System/ImportantFiles/Brand/Lativion OS Brand Black Alt.png"
					alt="LateTheIdiot Lativion OS"
					class="about_os-image"
					draggable="false"
				/>
				<div class="about_bar"></div>
			</div>
			<div class="about_body">
				<p>
					LateTheIdiot Lativion OS<br />
					Version (Most Recent Good Version)<br />
					<br />
					This was just a fun summer project.<br />
					And I had a lot of fun doing it! :)<br />
				</p>
				<div class="about_links">
					<a
						class="link"
						href={'#'}
						onclick={() => newWindow('notepad', { file: '/System/ImportantFiles/Credits.txt' })}
					>
						View Credits
					</a>
					<a class="link" target="_blank" href="https://github.com/Late-Is-Cool/lativion-os"
						>Source Code</a
					>
				</div>
			</div>
			<div class="about_buttons">
				<button class="button" onclick={() => removeWindow(windowID)}>OK</button>
			</div>
		</div>
	</Window.Body>
</Window.Root>

<style lang="scss">
	.about {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	.about_brand {
		width: 100%;
		background-color: #fff;
		text-align: center;
		padding-top: 10px;
	}

	.about_os-image {
		max-height: 70px;
	}

	.about_comp-image {
		position: absolute;
		height: 12px;
		right: 10px;
	}

	.about_bar {
		background-image: linear-gradient(90deg, #f0e961 0%, #f0985d 50%, #f0e961 100%);
		height: 6px;
		margin-top: 10px;
	}

	.about_body {
		padding-top: 30px;
		padding-inline: 80px;
		line-height: 1.5;
		height: 100%;
	}

	.about_buttons {
		text-align: right;
		padding: 10px;
	}

	.about_links {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
