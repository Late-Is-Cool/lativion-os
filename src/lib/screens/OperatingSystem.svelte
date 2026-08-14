<script lang="ts">
	import '$lib/skins/9x/index.scss';

	import { onMount, setContext, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		config,
		windowZIndexState,
		programIconsSelect,
		activeWindowState
	} from '$stores/stores.svelte';
	// * components
	import { Taskbar } from '$components/ui/taskbar';
	import { SystemTray } from '$components/ui/taskbar/systemTray';
	import { ContextMenu } from '$components/ui/context-menu';
	import ProgramIcon from '$components/ui/ProgramIcon.svelte';
	// * util
	import { playSound, setVolume } from '$lib/util/audio';
	import { newWindow, programList, windows } from '$lib/index.svelte';
	import { SelectionBox } from '$components/ui/selection';
	import { StartMenu } from '$components/ui/start-menu';

	// * stinking states
	let overlay: boolean = $state(true);
	let time: string = $state(
		new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
			hour: 'numeric',
			minute: '2-digit'
		})
	);

	let toggles = $state({
		startMenu: false,
		contextMenu: false
	});

	// * context menu
	let contextMenuElement: HTMLElement;
	let contextMenuX: number = $state(0),
		contextMenuY: number = $state(0);

	// * functions
	async function contextMenuFunc(event: MouseEvent) {
		toggles.contextMenu = false;

		await tick();

		event.preventDefault();
		event.stopImmediatePropagation();

		// const target = event.target as HTMLElement;
		// if (!target?.classList.contains('operating-system_desktop')) return;

		toggles.contextMenu = true;
		toggles.startMenu = false;

		await tick();

		contextMenuX =
			event.clientX >= innerWidth - contextMenuElement.offsetWidth
				? event.clientX - contextMenuElement.offsetWidth
				: event.clientX;
		contextMenuY =
			event.clientY >= innerHeight - contextMenuElement.offsetHeight - 31
				? event.clientY - contextMenuElement.offsetHeight
				: event.clientY;

		// contextMenuX = event.clientX;
		// contextMenuY = event.clientY;
	}

	setContext('osToggles', toggles);

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
	});

	onMount(() => {
		overlay = false;
		playSound('startup');
		newWindow('warning');
	});
</script>

<div
	class="operating-system"
	oncontextmenu={contextMenuFunc}
	onclick={() => {
		toggles.contextMenu = false;
		toggles.startMenu = false;
		programIconsSelect.length = 0;
	}}
>
	<!-- * Desktop -->
	<div
		class="operating-system_desktop"
		onmousedown={() => {
			activeWindowState.activeWindow = null;
		}}
	>
		<SelectionBox.Root>
			<div class="operating-system_desktop-programs">
				<ProgramIcon
					name="Test"
					icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/debug-32-abnormal.png"
					program="warning"
					shortcut
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
				<ProgramIcon
					name="Browser"
					icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/Browser.png"
					program="browser"
					shortcut
				/>
				<ProgramIcon
					name="Buy Me a Coffee"
					icon="/System/ImportantFiles/Shell/Themes/9x/Icons/32x32/BMaC.png"
					externalSite="https://buymeacoffee.com/late"
					shortcut
				/>
			</div>
		</SelectionBox.Root>
	</div>

	<!-- * why were windows in the desktop, is there a lore reason -->
	<div class="operating-system_windows">
		{#each windows as window (window.windowID)}
			{@const Program = window.program}
			<Program
				{...window.props}
				windowID={window.windowID}
				zIndex={window.zIndex}
				minimized={window.minimized}
				initialPosition={{
					x: 30 + (windows.length % 9) * 20,
					y: 60 + (windows.length % 9) * 20
				}}
			/>
			<!--
				initialPosition={{
					x: 30 + positionCounterState.positionCounter * 20,
					y: 60 + positionCounterState.positionCounter * 20
				}} 
			-->
		{/each}
	</div>

	<!-- * Taskbar  -->
	<Taskbar.Root>
		<Taskbar.StartButton icon="/System/ImportantFiles/Brand/LativionOS-Small.png" text="Start" />
		<div class="divider-vertical"></div>
		<Taskbar.TaskAppContainer>
			{#each windows as window (window.windowID)}
				{#if window.meta?.taskApp !== false}
					<Taskbar.TaskApp
						windowID={window.windowID}
						title={window.meta?.title}
						icon={window.meta?.icon}
					/>
				{/if}
			{/each}
		</Taskbar.TaskAppContainer>
		<SystemTray.Root>
			{#each windows as window (window.windowID)}
				{#if window.meta?.systemTray}
					<SystemTray.TrayApp icon={window.meta.icon} name={window.meta.title} action={() => {}} />
				{/if}
			{/each}
			<SystemTray.TrayApp
				icon="/System/ImportantFiles/Shell/Themes/9x/Icons/16x16/Volume{config.volume
					? ''
					: '-Mute'}.png"
				name=""
				action={() => {
					if (config.volume == true) {
						setVolume(0);
						config.volume = false;
					} else {
						setVolume(100);
						config.volume = true;
					}
				}}
			/>
			<span>{time}</span>
		</SystemTray.Root>
	</Taskbar.Root>
	<!-- * Start menu -->
	{#if toggles.startMenu}
		<StartMenu.Root>
			<StartMenu.Title text="Lativion OS" />
			<StartMenu.Container>
				<!-- <StartMenu.Item
					text="Lativion OS Update"
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/LativionOSUpdate.png"
				/>
				<div class="divider-horizontal"></div> -->
				<StartMenu.Item
					text="Programs"
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Programs.png"
				>
					<ContextMenu.Root>
						{#each programList as program}
							{#if program.folders[0] !== '(sys78)'}
								<ContextMenu.Item
									onclick={() => newWindow(program.programName)}
									text={program.title}
									icon={program.icon || null}
								/>
							{/if}
						{/each}
					</ContextMenu.Root>
				</StartMenu.Item>
				<!-- <StartMenu.Item
					text="Settings"
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Settings.png"
				/> -->
				<div class="divider-horizontal"></div>
				<!-- <StartMenu.Item
					text="Help"
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Help.png"
				/> -->
				<StartMenu.Item
					text="Run..."
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Run.png"
					onclick={() => newWindow('run')}
				/>
				<div class="divider-horizontal"></div>
				<StartMenu.Item
					text={config.fullscreen ? 'Minimize' : 'Fullscreen'}
					img={config.fullscreen
						? '/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Minimize.png'
						: '/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Fullscreen.png'}
					onclick={() => {
						const documentElement = document.documentElement;
						if (!config.fullscreen) {
							documentElement.requestFullscreen?.();
						} else {
							document.exitFullscreen?.();
						}
						config.fullscreen = !config.fullscreen;
					}}
				/>
				<!-- <StartMenu.Item
					text="Shut Down..."
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/Shutdown.png"
				/> -->
				<div class="divider-horizontal"></div>
				<StartMenu.Item
					text="About"
					img="/System/ImportantFiles/Shell/Themes/9x/Icons/24x24/File-Informative.png"
					onclick={() => {
						newWindow('about');
					}}
				/>
			</StartMenu.Container>
		</StartMenu.Root>
	{/if}
	<!-- * Context Menu -->
	{#if toggles.contextMenu}
		<ContextMenu.Root
			position={{ x: contextMenuX, y: contextMenuY }}
			bind:node={contextMenuElement}
		>
			<ContextMenu.Item onclick={() => console.log('WHAT')} text="Paste" disabled />
			<ContextMenu.Item onclick={() => {}} text="Paste Shortcut" disabled />
			<div class="divider-horizontal"></div>
			<ContextMenu.Item onclick={() => console.log('thing')} text="New" disabled>
				<ContextMenu.Root>
					<ContextMenu.Item onclick={() => {}} text="Folder" />
					<ContextMenu.Item onclick={() => {}} text="Shortcut" />
					<div class="divider-horizontal"></div>
					<ContextMenu.Item onclick={() => {}} text="Text Document" />
				</ContextMenu.Root>
			</ContextMenu.Item>
			<div class="divider-horizontal"></div>
			<ContextMenu.Item onclick={() => console.log('thing3')} text="Properties" disabled />
		</ContextMenu.Root>
	{/if}
</div>

{#if overlay}
	<div class="fade-overlay" transition:fade={{ duration: 500 }}></div>
{/if}
