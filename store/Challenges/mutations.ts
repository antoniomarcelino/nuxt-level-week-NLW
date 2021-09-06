import { MutationsInterface, Mutations } from './types';

export default {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX] (state, index) {
		state.currentChallengeIndex = index;
	},
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN] (state, flag): void {
		state.isLevelUpModalOpen = flag;
	},
	[Mutations.COMPLETE_CHALLENGE] (state, amount) {
		const { current, end } = state.xp;
		const currentTotal = amount + current;
		const shouldLevelUp = (currentTotal) >= end;
		state.completedChallenges += 1;

		if (shouldLevelUp) {
			state.level += 1;
			const remaining = (currentTotal) - end;
			const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);
			state.xp = {
				current: remaining,
				start: 0,
				end: experienceToNextLevel,
			};
			state.isLevelUpModalOpen = true;
			return;
		}

		state.xp = {
			...state.xp,
			current: currentTotal,
		};
	},
} as MutationsInterface;
