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
}
