interface WindowContext {
	windowID: number;
	maximized: () => boolean;
	position: {
		x: number;
		y: number;
	};
	size: {
		h: number;
		w: number;
	};
	closeWindow: () => void;
	handleMaximize: () => void;
	footer: () => boolean;
	scalable: () => boolean;
	status: {
		idle: boolean;
		moving: boolean;
		resizing: boolean;
	};
}

// kinda... idk
interface SubMenuContext {
	subMenuItem: () => HTMLElement;
	hovered: boolean;
	isHovered: (value: boolean) => void;
}

interface TabListMenuContext {
	tablistItem: () => HTMLButtonElement;
}

interface TablistContext {
	register: () => number;
	activate: (index: number | null) => void;
	isActive: (index: number | null) => boolean;
}

interface osTogglesContext {
	startMenu: boolean;
	contextMenu: boolean;
}
