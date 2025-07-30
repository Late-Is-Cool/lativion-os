<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		activeWindowState,
		config,
		windowZIndexState,
		positionCounterState,
		programIconsSelect
	} from '$stores/stores.svelte';
	// * components
	import TaskApp from '$components/ui/TaskApp.svelte';
	import ContextMenu from '$components/ui/ContextMenu.svelte';
	import ContextMenuItem from '$components/ui/ContextMenuItem.svelte';
	import ProgramIcon from '$components/ui/ProgramIcon.svelte';
	// * util
	import { playSound } from '$lib/util/audio';
	import { newWindow, windows } from '$lib/index.svelte';

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
	let desktopSelect: boolean = $state(false);

	// * context menu
	let contextMenuElement: HTMLElement;
	let contextMenuX: number = $state(0),
		contextMenuY: number = $state(0);

	// * mouse positions
	let startMouseX: number = $state(0),
		startMouseY: number = $state(0);

	// * selection
	let selectionHeight: number = $state(0),
		selectionWidth: number = $state(0);

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
		console.log(event.clientY);
	}

	// ! lets all laugh at an indie dev who never learns anything teeheehee
	function selectionBoxHandlerDown(event: MouseEvent) {
		if (event.target !== event.currentTarget) return;
		if (event.button == 0) desktopSelect = true;
		selectionHeight = 0;
		selectionWidth = 0;
		startMouseX = event.clientX;
		startMouseY = event.clientY;
		startMenuToggle = false;
		activeWindowState.activeWindow = null;
	}

	function selectionBoxHandlerMove(event: MouseEvent) {
		if (!desktopSelect) return;
		selectionWidth = event.clientX - startMouseX;
		selectionHeight = event.clientY - startMouseY;
	}

	function selectionBoxHandlerUp(event: MouseEvent) {
		event.preventDefault();
		desktopSelect = false;
		if (event.target !== event.currentTarget) return;
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
		console.log(contextMenuElement);
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
	onmouseup={selectionBoxHandlerUp}
	onmousemove={selectionBoxHandlerMove}
	onclick={() => {
		contextMenuToggle = false;
		programIconsSelect.length = 0;
	}}
>
	<!-- * Desktop -->
	<div class="operating-system_desktop" onmousedown={selectionBoxHandlerDown}>
		<div
			class="selection-box"
			style="width: {Math.abs(selectionWidth)}px; height: {Math.abs(
				selectionHeight
			)}px; top: {Math.min(startMouseY, startMouseY + selectionHeight)}px; left: {Math.min(
				startMouseX,
				startMouseX + selectionWidth
			)}px;"
			hidden={!desktopSelect}
		></div>
		<div class="operating-system_desktop-programs">
			<ProgramIcon
				name="Test"
				icon="/System/ImportantFiles/Shell/Icons/32x32/debug-32-abnormal.png"
				program="warning"
			/>
			<ProgramIcon
				name="Notepad"
				icon="/System/ImportantFiles/Shell/Icons/32x32/Text.png"
				program="notepad"
				shortcut
			/>
			<ProgramIcon
				name="Oneko"
				icon="/System/ImportantFiles/Shell/Icons/32x32/Oneko.png"
				program="oneko"
				shortcut
			/>
			<ProgramIcon
				name="Blog"
				icon="/System/ImportantFiles/Shell/Icons/32x32/Oneko.png"
				program="blog"
				shortcut
			/>
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
				draggable="false"
			/>
			<span>Start</span>
		</button>
		<div class="divider-vertical"></div>
		<div class="taskbar_programs">
			{#each windows as window (window.windowID)}
				<TaskApp windowID={window.windowID} title={window.meta?.title} icon={window.meta?.icon} />
			{/each}
		</div>
		<div class="taskbar_system-tray">
			{#each windows as window (window.windowID)}
				{#if window.meta?.systemTray}
					<img src={window.meta.icon} alt={window.meta.title} draggable="false" />
				{/if}
			{/each}
			<img
				src="/System/ImportantFiles/Shell/Icons/16x16/Volume{config.volume ? '' : '-Mute'}.png"
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
					<img src="/System/ImportantFiles/Shell/Icons/24x24/Programs.png" alt="Icon" />
					<span>Programs</span>
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/24x24/Settings.png" alt="Icon" />
					<span>Settings</span>
				</li>
				<div class="divider-horizontal"></div>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/24x24/Help.png" alt="Icon" />
					<span>Help</span>
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/24x24/Run.png" alt="Icon" />
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
						<img src="/System/ImportantFiles/Shell/Icons/24x24/Minimize.png" alt="Icon" />
						<span>Minimize</span>
					{:else}
						<img src="/System/ImportantFiles/Shell/Icons/24x24/Fullscreen.png" alt="Icon" />
						<span>Fullscreen</span>
					{/if}
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/24x24/Shutdown.png" alt="Icon" />
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
					<img src="/System/ImportantFiles/Shell/Icons/24x24/File-Informative.png" alt="Icon" />
					<span>About</span>
				</li>
			</ul>
		</div>
	{/if}
	<!--* Context Menu -->
	{#if contextMenuToggle}
		<ContextMenu x={contextMenuX} y={contextMenuY} bind:node={contextMenuElement}>
			{#snippet items()}
				<ContextMenuItem onclick={() => console.log('thing')} text="Create File..." />
				<ContextMenuItem
					onclick={() => newWindow('testprogram')}
					icon="/System/ImportantFiles/Shell/Icons/16x16/debug-16.png"
					text="Create Folder..."
				/>
				<div class="divider-horizontal"></div>
				<ContextMenuItem onclick={() => newWindow('prompttest')} text="Properties" />
			{/snippet}
		</ContextMenu>
	{/if}
</div>

{#if overlay}
	<div class="fade-overlay" transition:fade={{ duration: 500 }}></div>
{/if}
