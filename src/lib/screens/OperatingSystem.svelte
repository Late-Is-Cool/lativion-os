<script>
	import { onMount } from 'svelte';
	import Button from '$components/ui/Button.svelte';
	import { fade } from 'svelte/transition';

	// * stinking states
	let overlay = $state(true);
	let time = $state(
		new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	// ? start menu
	let startMenuToggle = $state(false);
	let contextMenuToggle = $state(false);
	let desktopSelect = $state(false);
	// ? context menu position
	let contextMenuX = $state(0);
	let contextMenuY = $state(0);

	// * functions
	/**
	 *
	 * @param {MouseEvent} e
	 */
	function contextMenuFunc(e) {
		e.preventDefault();
		contextMenuToggle = true;
		contextMenuX = e.clientX;
		contextMenuY = e.clientY;
	}

	// ! lets all laugh at an indie dev who never learns anything teeheehee
	/**
	 *
	 * @param {MouseEvent} e
	 */
	function selectionBoxHandlerDown(e) {
		if (e.button == 0) desktopSelect = true;
		startMenuToggle = false;
		contextMenuToggle = false;
	}
	/**
	 *
	 * @param {MouseEvent} e
	 */
	function selectionBoxHandlerUp(e) {
		e.preventDefault();
		if (e.button == 0) desktopSelect = false;
	}

	$effect(() => {
		const timeInterval = setInterval(() => {
			time = new Date().toLocaleTimeString(window.navigator.language || 'en-US', {
				hour: 'numeric',
				minute: '2-digit'
			});
		}, 100);
		console.log(desktopSelect);
		return () => {
			clearInterval(timeInterval);
		};
	});
	onMount(() => {
		overlay = false;
		let bootSound = new Audio('/System/ImportantFiles/Sounds/boot.mp3');
		bootSound.play();
	});
</script>

<!-- i dont care about accessibility right now -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="operating-system" oncontextmenu={contextMenuFunc}>
	<!--* Desktop -->
	<div
		class="operating-system_desktop"
		onmousedown={selectionBoxHandlerDown}
		onmouseup={selectionBoxHandlerUp}
	>
		<div>
			<Button>
				{#snippet text()}
					Ok
				{/snippet}
			</Button>
		</div>
	</div>
	<!--* Taskbar -->
	<div
		class="taskbar"
		onclick={() => {
			contextMenuToggle = false;
			// startMenuToggle = false;
		}}
	>
		<!-- special start button because i cant be bothered -->
		<button
			class="taskbar_start-button {startMenuToggle ? 'border-9x-invert' : 'border-9x'}"
			onclick={() => {
				startMenuToggle = !startMenuToggle;
			}}
		>
			<img src="/System/ImportantFiles/Brand/LativionOS-Small.png" alt="Lativion OS Logo Small" />
			<span>Start</span>
		</button>
		<div class="taskbar_programs"></div>
		<div class="taskbar_system-tray">
			<span>{time}</span>
		</div>
	</div>
	<!--* Start menu -->
	{#if startMenuToggle}
		<div class="start-menu">
			<div class="start-menu_title"><span>Lativion OS</span></div>
			<ul class="start-menu_container">
				<li class="start-menu_item start-menu_item_sub">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>Programs</span>
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>Settings</span>
				</li>
				<div class="start-menu_divider"></div>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>Help</span>
				</li>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>Run...</span>
				</li>
				<div class="start-menu_divider"></div>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>Shut Down...</span>
				</li>
				<div class="start-menu_divider"></div>
				<li class="start-menu_item">
					<img src="/System/ImportantFiles/Shell/Icons/debug-24.png" alt="Icon" />
					<span>About</span>
				</li>
			</ul>
		</div>
	{/if}
	<!--* Context Menu -->
	{#if contextMenuToggle}
		<div class="context-menu" style="top: {contextMenuY}px; left: {contextMenuX}px">
			<ul class="context-menu_container">
				<li class="context-menu_item">Create File...</li>
				<li class="context-menu_item">Create Folder...</li>
			</ul>
		</div>
	{/if}
</div>

{#if overlay}
	<div class="fade-overlay" transition:fade={{ duration: 500 }}></div>
{/if}
