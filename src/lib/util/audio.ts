import { Howl } from 'howler';

import { config } from '$stores/stores.svelte';

type Sounds = Record<string, Howl>;

export const sounds: Sounds = {
	boot: new Howl({ src: ['/System/ImportantFiles/Sounds/boot.mp3'] }),
	tada: new Howl({ src: ['/System/ImportantFiles/Sounds/tada.mp3'] }),
	chord: new Howl({ src: ['System/ImportantFiles/Sounds/chord.mp3'] }),
	quack: new Howl({ src: ['System/ImportantFiles/Sounds/quack.mp3'] })
};

export function playSound(name: keyof Sounds) {
	// if (!config.volume) return;
	if (!sounds[name]) {
		console.error(`${name} is not a valid sound!`);
		return;
	}

	sounds[name].play();
}

export function setVolume(volume: number) {
	if (volume < 0 || volume > 100) {
		console.error(`${volume} is invalid, input an integer between 0 and 100.`);
	}
	let volumeDecimal = volume / 100;

	Howler.volume(volumeDecimal);
}
