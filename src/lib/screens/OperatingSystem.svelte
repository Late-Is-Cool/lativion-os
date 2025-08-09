<script lang="ts">
	import '$lib/skins/9x/9x.scss';

	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		config,
		windowZIndexState,
		positionCounterState,
		programIconsSelect
	} from '$stores/stores.svelte';
	// * components
	import TaskApp from '$components/ui/TaskApp.svelte';
	import { ContextMenu } from '$components/ui/context-menu/index';
	import ProgramIcon from '$components/ui/ProgramIcon.svelte';
	// * util
	import { playSound } from '$lib/util/audio';
	import { newWindow, windows } from '$lib/index.svelte';
	import SelectionBox from '$components/ui/SelectionBox.svelte';

	// * stinking states
	let overlay: boolean = $state(true);
	let time: string = $state(
		new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
			hour: 'numeric',
			minute: '2-digit'
		})
	);

	// * start menu
	let startMenuToggle: boolean = $state(false);
	let contextMenuToggle: boolean = $state(false);

	// * context menu
	let contextMenuElement: HTMLElement;
	let contextMenuX: number = $state(0),
		contextMenuY: number = $state(0);

	// * functions
	async function contextMenuFunc(event: MouseEvent) {
		event.preventDefault();

		const target = event.target as HTMLElement;
		if (!target?.classList.contains('operating-system_desktop')) return;

		contextMenuToggle = true;

		await tick();

		contextMenuX = event.clientX;
		contextMenuY =
			event.clientY >= innerHeight - contextMenuElement.offsetHeight - 31
				? event.clientY - contextMenuElement.offsetHeight
				: event.clientY;
	}

	$effect(() => {
		const timeInterval: ReturnType<typeof setInterval> = setInterval(() => {
			time = new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
				hour: 'numeric',
				minute: '2-digit'
			});
		}, 100);
		return () => {
			clearInterval(timeInterval);
		};
	});

	$effect(() => {
		if (windows.length === 1) windowZIndexState.windowZIndex = 0;
		if (positionCounterState.positionCounter === 10) positionCounterState.positionCounter = 0;
	});

	onMount(() => {
		overlay = false;
		playSound('boot');
		newWindow('warning');
	});
</script>

<div
	class="operating-system"
	oncontextmenu={contextMenuFunc}
	onclick={() => {
		contextMenuToggle = false;
		programIconsSelect.length = 0;
	}}
>
	<!-- * Desktop -->
	<div class="operating-system_desktop">
		<!-- <SelectionBox /> -->
		<div class="operating-system_desktop-programs">
			<ProgramIcon
				name="Test"
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/debug-32-abnormal.png"
				program="warning"
			/>
			<ProgramIcon
				name="Notepad"
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Text.png"
				program="notepad"
				shortcut
			/>
			<ProgramIcon
				name="Oneko"
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Oneko.png"
				program="oneko"
				shortcut
			/>
			<ProgramIcon
				name="Not a virus :)"
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Text.png"
				program="hydra"
			/>
			<!-- <ProgramIcon
				name="Browser"
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Browser.png"
				program="browser"
			/> -->
		</div>
		<div>
			{#each windows as window (window.windowID)}
				{@const Program = window.program}
				<Program
					{...window.props}
					windowID={window.windowID}
					zIndex={window.zIndex}
					minimized={window.minimized}
					initialPosition={{
						x: 30 + positionCounterState.positionCounter * 20,
						y: 60 + positionCounterState.positionCounter * 20
					}}
				/>
			{/each}
		</div>
	</div>
	<!-- * Taskbar  -->
	<div
		class="taskbar animate__animated animate__fadeInUp"
		onclick={() => {
			contextMenuToggle = false;
			startMenuToggle = false;
		}}
	>
		<!-- special start button because i cant be bothered -->
		<button
			class="taskbar_start-button"
			aria-pressed={startMenuToggle}
			onclick={(event) => {
				event.stopPropagation();
				startMenuToggle = !startMenuToggle;
				contextMenuToggle = false;
			}}
		>
			<img
				src="/System/ImportantFiles/Brand/LativionOS-Small.png"
				alt="Lativion OS Logo Small"
				aria-hidden
				draggable="false"
			/>
			<span>Start</span>
		</button>
		<div class="divider-vertical"></div>
		<div class="taskbar_programs">
			{#each windows as window (window.windowID)}
				{#if window.meta?.taskApp !== false}
					<TaskApp windowID={window.windowID} title={window.meta?.title} icon={window.meta?.icon} />
				{/if}
			{/each}
		</div>
		<div class="taskbar_system-tray">
			{#each windows as window (window.windowID)}
				{#if window.meta?.systemTray}
					<img src={window.meta.icon} alt={window.meta.title} draggable="false" />
				{/if}
			{/each}
			<img
				src="/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Volume{config.volume
					? ''
					: '-Mute'}.png"
				alt="Volume"
				onclick={() => (config.volume = !config.volume)}
			/>
			<span>{time}</span>
		</div>
	</div>
	<!--* Start menu -->
	{#if startMenuToggle}
		<div class="start-menu">
			<div class="start-menu_title"><span>Lativion OS</span></div>
			<ul class="start-menu_container">
				<li class="start-menu_item start-menu_item_sub">
					<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Programs.png" alt="Icon" />
					<span>Programs</span>
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Settings.png" alt="Icon" />
					<span>Settings</span>
				</li>
				<div class="divider-horizontal"></div>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Help.png" alt="Icon" />
					<span>Help</span>
				</li>
				<li
					class="start-menu_item"
					onclick={() => {
						newWindow('run');
						startMenuToggle = false;
					}}
				>
					<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Run.png" alt="Icon" />
					<span>Run...</span>
				</li>
				<div class="divider-horizontal"></div>
				<li
					class="start-menu_item"
					onclick={() => {
						const documentElement = document.documentElement;
						if (!config.fullscreen) {
							documentElement.requestFullscreen?.();
						} else {
							document.exitFullscreen?.();
						}
						config.fullscreen = !config.fullscreen;
						startMenuToggle = false;
					}}
				>
					{#if config.fullscreen}
						<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Minimize.png" alt="Icon" />
						<span>Minimize</span>
					{:else}
						<img
							src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Fullscreen.png"
							alt="Icon"
						/>
						<span>Fullscreen</span>
					{/if}
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Shutdown.png" alt="Icon" />
					<span>Shut Down...</span>
				</li>
				<div class="divider-horizontal"></div>
				<li
					class="start-menu_item"
					onclick={() => {
						newWindow('about');
						startMenuToggle = false;
					}}
				>
					<img
						src="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/File-Informative.png"
						alt="Icon"
					/>
					<span>About</span>
				</li>
			</ul>
		</div>
	{/if}
	<!--* Context Menu -->
	{#if contextMenuToggle}
		<ContextMenu.Root x={contextMenuX} y={contextMenuY} bind:node={contextMenuElement}>
			<ContextMenu.Item onclick={() => console.log('thing')} text="Create File..." />
			<ContextMenu.Item
				onclick={() => console.log('thing2')}
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/debug-16.png"
				text="Create Folder..."
			/>
			<div class="divider-horizontal"></div>
			<ContextMenu.Item onclick={() => console.log('thing3')} text="Properties" />
		</ContextMenu.Root>
	{/if}
</div>

{#if overlay}
	<div class="fade-overlay" transition:fade={{ duration: 500 }}></div>
{/if}
