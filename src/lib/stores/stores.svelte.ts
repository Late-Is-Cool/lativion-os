let screen: number = $state(0);

export const screenState = {
	get screen() {
		return screen;
	},
	set screen(value) {
		screen = value;
	}
};

export let config: { volume: boolean; fullscreen: boolean } = $state({
	volume: true,
	fullscreen: false
});

// let config = new PersistentState(
// 	'config',
// 	{
// 		volume: true,
// 		fullscreen: false
// 	},
// 	'localStorage'
// );

let activeWindow: number | null = $state(null);

export const activeWindowState = {
	get activeWindow() {
		return activeWindow;
	},
	set activeWindow(windowID) {
		activeWindow = windowID;
	}
};

let windowZIndex: number = $state(0);

export const windowZIndexState = {
	get windowZIndex() {
		return windowZIndex;
	},
	set windowZIndex(zIndex) {
		windowZIndex = zIndex;
	}
};

export let programIconsSelect: string[] = $state([]);
