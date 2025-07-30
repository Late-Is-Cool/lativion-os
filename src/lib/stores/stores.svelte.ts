let screen: number = $state(0);

export const screenState = {
	get screen() {
		return screen;
	},
	set screen(value) {
		screen = value;
	}
};

export let config: { volume: boolean, fullscreen: boolean } = $state({
	volume: true,
	fullscreen: false
});

let activeWindow: number | null = $state(null);

export const activeWindowState = {
        get activeWindow() {
                return activeWindow
        },
        set activeWindow(windowID) {
                activeWindow = windowID;
        }
}

let windowZIndex: number = $state(0);

export const windowZIndexState = {
	get windowZIndex() {
		 return windowZIndex
	},
	set windowZIndex(zIndex) {
		windowZIndex = zIndex
	}
}

let positionCounter: number = $state(0);

export const positionCounterState = {
	get positionCounter() {
		return positionCounter
	},
	set positionCounter(value) {
		positionCounter = value
	}
}

export let programIconsSelect: string[] = $state([]);
