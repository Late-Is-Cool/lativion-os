let screen = $state(0);

// /**
//  * @type {{volume: boolean}}
//  */
// const config = $state({
// 	volume: true
// });

export const screenState = {
	get screen() {
		return screen;
	},
	set screen(value) {
		screen = value;
	}
};

// export function getConfig(key: string) {
// 	return config[key];
// }
// export function setConfig(key: string, value: string) {
// 	if (key in config) {
// 		config[key] = value;
// 	} else {
// 		console.warn(`Config key "${key}" does not exist.`);
// 	}
// }
