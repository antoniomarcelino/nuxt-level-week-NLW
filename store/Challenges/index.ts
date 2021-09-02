import allChallenges from '~/assets/desafios/data';
import { State } from './types';

export const state = (): State => ({
	level: 1,
	xp: {
		current: 20,
		start: 0,
		end: 64,
	},
	completedChallenges: 0,
	currentChallengeIndex: null,
	isLevelUpModalOpen: false,
	allChallenges,
});
