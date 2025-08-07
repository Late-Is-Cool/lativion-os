import type { PageServerLoad } from './$types';
import packageJSON from '../../package.json';

export const load: PageServerLoad = async () => {
	return {
		version: packageJSON.version
	};
};
