interface WindowContext {
        windowID: number;
        maximized: () => boolean;
        closeWindow: () => void;
        handleMaximize: () => void;
}
