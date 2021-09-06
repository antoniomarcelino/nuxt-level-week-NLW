<template>
	<div>
		<div class="bg-white rounded-md flex flex-1 w-full mt-8 lg:mt-0 shadow-sm">
			<Challenge v-if="currentChallenge" v-bind="currentChallenge" />
			<StartCycle v-else />
			<LevelUpModal />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import LevelUpModal from '~/components/atoms/LevelUpModal.vue';
import Challenge from '~/components/others/Challenge.vue';
import StartCycle from '~/components/atoms/StartCycle.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
	components: {
		LevelUpModal,
		Challenge,
		StartCycle,
	},
	computed: mapGetters('Challenges', ['currentChallenge']),
});

</script>

</script>
