import {Howl} from "howler"

import { config } from "$stores/stores.svelte";

/**
 * @type {Object.<string, Howl>}
 */
export const sounds = {
        boot: new Howl({ src: ["/System/ImportantFiles/Sounds/boot.mp3"] })
}

export function playSound(name: keyof typeof sounds) {
        if (!config.volume) return
        if (!sounds[name]) {
                console.error(`${name} is not a valid sound!`);
                return;
        }
        
        sounds[name].play()
}
