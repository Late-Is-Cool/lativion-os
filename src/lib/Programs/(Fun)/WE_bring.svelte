<script module>
	import { Window } from '$components/ui/window';
	import { onMount } from 'svelte';

	export const meta = {
		title: 'WE_bring'
	};
</script>

<script lang="ts">
	let {
		windowID,
		zIndex,
		minimized
	}: {
		windowID: number;
		zIndex: number;
		minimized: boolean;
	} = $props();

	const wsites = [
		'https://brooklynights.nekoweb.org/',
		'https://kimberlygb.nekoweb.org',
		'https://oodlecat.meowandsparkle.party/',
		'https://purple-st4rz-556.neocities.org/',
		'https://dancingpatches.neocities.org',
		'https://afasterslowpoke.net',
		'https://pastel-skies.nekoweb.org',
		'https://lmdxiii.nekoweb.org/',
		'https://bekianee.art',
		'https://melonsoda.nekoweb.org',
		'https://datoxicwaltz.neocities.org/',
		'https://marshdotcom.neocities.org/',
		//'https://lopster.neocities.org', //- an older page of below? upd: account migration
		//'https://warak.neocities.org',
		'https://toribytez.neocities.org/',
		'https://ver-en-jenas.blogspot.com',
		'https://bakartridges-site.neocities.org/',
		'https://hal.nekoweb.org/',
		'https://bruisedgh0st.neocities.org/',
		'https://willascool.neocities.org/',
		'https://stonervampire.neocities.org/',
		'https://mishcoded.lol/',
		'https://hydromaniac.neocities.org',
		'https://ydkj.neocities.org',
		'https://dixn.neocities.org',
		//'https://chr0m0dynamic.nekoweb.org',
		'https://patchwork.nekoweb.org/',
		'https://aoki553.nekoweb.org/',
		//'https://myepicsite424.neocities.org/',
		'https://7vtia.nekoweb.org/',
		'https://th-yinoe.nekoweb.org',
		'https://edgyrabbid.space',
		'https://korenara.neocities.org/',
		'https://potd99.neocities.org',
		'https://demisdesignart.neocities.org',
		'https://thebrainhellscape13.leprd.space',
		'https://windowsfan88888.neocities.org',
		'https://cult-of-wisdom.nekoweb.org',
		'https://twentyphanday.nekoweb.org/',
		'https://coolthings.neocities.org',
		'https://remorse.neocities.org',
		'https://bibineko.neocities.org/',
		'https://necogutz.neocities.org',
		'https://hml.nekoweb.org',
		'https://lime360.nekoweb.org/',
		'https://xpace.nekoweb.org',
		'https://crystalsweb.neocities.org/',
		//'https://vespertinespiral.neocities.org/',
		'https://gr13f3r.com/',
		'https://r3ckoning.nekoweb.org/',
		'https://v0idspace.nekoweb.org/',
		'https://olliveen.neocities.org/',
		'https://julian.nekoweb.org/',
		'https://slashdiv.neocities.org/',
		'https://korumeow.dev/bio?ref=we_bring',
		'https://leucosoft-word.nekoweb.org',
		'https://kerchunkleknoughts.github.io/mainblog/',
		'https://exnihl.neocities.org',
		'https://thematildenet.nekoweb.org',
		'https://khanofmir.neocities.org',
		'https://graveyardpaws.web.fc2.com',
		'https://dove.town/',
		'https://ritasdoghouse.neocities.org',
		//'https://ren4ph.neocities.org',
		'https://smallcarnivore.neocities.org/',
		//'https://deadboywalking.neocities.org',
		'https://mufb.lol',
		'https://eriswavereal.nekoweb.org/',
		'http://xcrystiiangel.neocities.org/',
		`https://solver-coder.neocities.org/`,
		`https://mii-plaza.neocities.org/`,
		`https://sion.nya.je/`,
		`https://gahongx.neocities.org/`,
		//`https://forum.agoraroad.com/index.php`,
		`https://juliansepicsite.neocities.org/`,
		`https://waterskyline.neocities.org/`,
		'https://prismaticbolt.neocities.org/',
		`https://nogood-angel.moe`,
		//`https://pttsers.nekoweb.org/`,
		`https://okdvd.neocities.org/`,
		`https://thebutlersdesk.neocities.org/`,
		`https://killing-machine.neocities.org/`,
		`https://hexmiel.neocities.org/`,
		//`http://julietscafe.neocities.org/`,
		`https://pluto-sparv.neocities.org/`,
		`https://morrigan.nekoweb.org/`,
		`http://cwtch.nekoweb.org/`,
		`http://linkieta.neocities.org/`,
		`https://channelonion.neocities.org/`,
		'https://miaomiao.nekoweb.org/',
		'https://sweet-pea.neocities.org/',
		'https://carolinghellwalker.nekoweb.org/',
		'https://bloxy97.nekoweb.org/',
		'https://lapislabel.net/',
		'https://jacoblee.codes/',
		//'https://dupersuperkevin.neocities.org/',
		'https://dogzwrld19.neocities.org/',
		'https://asteroth.net/',
		'https://mid.nekoweb.org/',
		'https://mashumaro.nekoweb.org/',
		'https://g33z3r.com/shrine',
		'http://cornsandwitch.com/',
		'https://www.juliannes.website/',
		'https://meowco.neocities.org/',
		'https://goichisuda.nekoweb.org/',
		'https://calijori.com/',
		'https://eksentrismi.nekoweb.org/',
		'https://voidcrawlerz.neocities.org/',
		'https://k0ja.nekoweb.org/',
		'https://pancontinental.neocities.org/images/badges/PCA-badge.gif',
		'https://kyr0v.nekoweb.org/',
		'https://kranklys.neocities.org/',
		'https://fusionstrike.neocities.org/',
		'https://lativionos.run/',
		'https://pieceofthepie.online/',
		'https://nagisako.neocities.org/',
		'https://rushi.moe/'
	];

	const thisSite = window.location.host;
	let thisIndex = $state(0);

	function previous() {
		const site = thisIndex - 1 < 0 ? wsites.length - 1 : thisIndex - 1;
		window.open(wsites[site], '_blank');
	}

	function random() {
		let otherSites = wsites.slice();
		otherSites.splice(thisIndex, 1);
		const site = Math.floor(Math.random() * otherSites.length);
		window.open(otherSites[site], '_blank');
	}

	function next() {
		const site = thisIndex + 1 >= wsites.length ? 0 : thisIndex + 1;
		window.open(wsites[site], '_blank');
	}

	onMount(() => {
		console.log(thisSite);
		for (let i = 0; i < wsites.length; i++) {
			if (wsites[i].includes(thisSite)) {
				console.log('frite');
				thisIndex = i;
				break;
			}
		}

		console.log('done');
	});
</script>

<Window.Root
	{windowID}
	{zIndex}
	{minimized}
	initialSize={{ w: 280, h: 120 }}
	initialPosition={{ x: (innerWidth - 280) / 2, y: (innerHeight - 120) / 2 }}
	animations={false}
>
	<Window.TitleBar title={meta.title}>
		<Window.HelpButton
			onclick={() => window.open('https://brooklynights.nekoweb.org/we_bring/', '_blank')}
		/>
		<Window.CloseButton />
	</Window.TitleBar>
	<Window.Body>
		<div
			style="display: flex; flex-direction: column; align-items: center; min-height: 100%; padding: 10px; padding-top: 0;"
		>
			<img
				src="https://brooklynights.nekoweb.org/we_bring/flag.png"
				alt="we_bring icon"
				style="margin-block: auto;"
			/>
			<div>
				<button class="button" onclick={previous}>Previous</button>
				<button class="button" onclick={random}>Random</button>
				<button class="button" onclick={next}>Next</button>
			</div>
		</div>
	</Window.Body>
</Window.Root>
