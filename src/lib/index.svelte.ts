//          --
//         :********-
//        :**********
//       :***********
//       ************   %%%%%%%%%%%%%%%%
//         **********   #%%%%%%%%%%%%%%%%%
//          :*****:      %%%%%%%%%%%%%%%%%%#
//            +      -%%%%%%%%%%%%%%%%%%%%%%%-
//                %%%%%%%%%%%%%%%%%%%%%%%%%%%%%.
//         %%=%%%%%%=  %%%%%%%%%%%%%%      %%%%%%
//       %%%%%%%%%#    %%%%%%%%%%%-           %%%%%
//       %%%%%%%%      -%%%%%%%%%    ******    %%%%
//       %%%%%%    @@   %%%%%%%%=  :********+   %%%
//       %%%%:    @@@   -%%%%%%%   **********   %%%
//       %%+    %@@@@@   %%%%%%%   **********   %%%
//       %+-             =%%%%%%%   -******=   #%%%
//       %%%%%%%%#        %%%%%%%%            %%%%%
//       %%%%%%%%%%%%%%%- +%%%%%%%%%:       %%%%%%%
//       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//       %%%%%%%%%%%%%%%%%%%#       %%%%%%%%%#  #%%
//       %%%%%%%%%%%%%%%            *%%%%%%%
//         %%%%%%%%%%%%%:   ######   %%%%%    +++++
//           %%%%%%%%%%%%   ######   %%%.   -++++++++
//            -%%%%%%%%%%+  :#####=   %%   ++++++++++=
//              #%%%%%%%%%   :        %%.  =++++++++++
//                %%%%%%%%.       +%%%%%%   +++++++++:
//                  %%%%%%% %%%%%%%%%%%%     ++++++=
//
// Lativion OS stuff

import type { Snippet, Component } from 'svelte';

interface ProgramMeta {
	title: string;
	icon?: string;
	scalable?: boolean;
	systemTray?: boolean;
	taskApp?: boolean;
}

interface ProgramModule {
	program: Component;
	meta?: ProgramMeta;
}

type Program = {
	windowID: number;
	program: Component;
	meta?: ProgramMeta;
	zIndex: number;
	minimized: boolean;
	props: Object;
};

import { activeWindowState, positionCounterState, windowZIndexState } from '$stores/stores.svelte';
import Prompt from '$components/ui/Prompt.svelte';

// # load pseudo-programs
const programModules = import.meta.glob('./Programs/**/*.svelte');

const programs: Record<string, () => Promise<ProgramModule>> = {};

for (const path in programModules) {
	const match = path.match(/\.\/Programs\/(.*)\.svelte$/);
	if (!match || !match[1]) continue;

	const segments = match[1]?.split('/');
	const name = segments?.[segments.length - 1]?.toLowerCase();
	if (!name) continue;

	programs[name] = async () => {
		const mod = (await programModules[path]()) as {
			default: Component;
			meta?: ProgramMeta;
		};
		return {
			program: mod.default,
			meta: mod?.meta
		};
	};
}

export const windows: Program[] = $state([]);
let nextID = 0;

export async function newWindow(programName: string, props = {}): Promise<void> {
	const programLoader = programs[programName.toLowerCase()];
	if (!programLoader) throw new Error(`Program "${programName}" is not found!`);

	const { program, meta } = await programLoader();
	const windowID = nextID++;
	windows.push({
		windowID,
		program,
		meta,
		zIndex: windowZIndexState.windowZIndex++,
		minimized: false,
		props: { ...props }
	});

	activeWindowState.activeWindow = windowID;
	windowZIndexState.windowZIndex++;
	positionCounterState.positionCounter++;
}

export function removeWindow(windowID: number): void {
	const index = windows.findIndex((w) => w.windowID === windowID);
	if (index !== -1) windows.splice(index, 1);
}

export function focusWindow(windowID: number): void {
	const win = windows.find((w) => w.windowID === windowID);
	if (!win) return;

	if (activeWindowState.activeWindow !== windowID) win.zIndex = windowZIndexState.windowZIndex++;
	if (win.minimized) win.minimized = false;
	activeWindowState.activeWindow = windowID;
}

export function minimizeRestoreWindow(windowID: number): void {
	const win = windows.find((w) => w.windowID === windowID);
	if (!win) return;

	if (win.minimized) {
		focusWindow(windowID);
	} else {
		win.minimized = true;
		activeWindowState.activeWindow = null;
	}
}

export function newPrompt(icon: string = 'Error', title: string = 'Error', text: string): void {
	const windowID = nextID++;
	windows.push({
		windowID,
		meta: {
			title
		},
		program: Prompt as Component,
		zIndex: windowZIndexState.windowZIndex++,
		minimized: false,
		props: {
			icon,
			title,
			text
		}
	});
	focusWindow(windowID);
}
