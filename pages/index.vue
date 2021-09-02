<template>
	<section class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20">
		<div class="flex flex-col w-full lg:w-1/2">
			<Profile />
			<CompletedChallenges />
			<Countdown @completed="getNewChallenge" />
			<button v-if="hasCountdownCompleted" class="button completed">
				Cycle Completed
			</button>
			<button v-else-if="isCountdownActive" class="button abandon" @click="setCountdownState(false)">
				Abandon Cycle
			</button>
			<button v-else class="button start" @click="setCountdownState(true)">
				Start a Cycle
			</button>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { Mutations as CountdownMT } from '../store/Countdown/types';
import { playAudio, sendNotification } from '~/utils';
import CompletedChallenges from '~/components/atoms/CompletedChallenges.vue';
import Profile from '~/components/others/Profile.vue';
import Countdown from '~/components/others/Countdown.vue';

interface Head {
	title: string;
}

export default Vue.extend({
	head (): Head {
		return {
			title: 'Pomodoro App | + Time',
		};
	},
	computed: {
		...mapState('Countdown', {
			hasCountdownCompleted: 'hasCompleted',
			isCountdownActive: 'isActive',
		}),
	},
	mounted () {
		if ('Notification' in window) {
			Notification.requestPermission();
		}
	},
	methods: {
		...mapMutations({
			setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
			setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
		}),
		setCountdownState (flag: boolean) {
			this.setCountdownHasCompleted(false);
			this.setCountdownIsActive(flag);
		},
		getNewChallenge () {
			this.setCountdownHasCompleted(true);
			if (Notification?.permission === 'granted') {
				playAudio('/notification.mp3');
				sendNotification('New Challenge', {
					body: 'A new challenge has started!',
					icon: '/favicon.png',
				});
			}
		},
	},
	components: {
		CompletedChallenges,
		Profile,
		Countdown,
	},
});
</script>
