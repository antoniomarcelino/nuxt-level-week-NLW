<template>
	<div class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani">
		<CountdownDigits :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigits :digits="seconds" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
// import { Mutations } from '~/store/Countdown/types';
import CountdownDigits from '~/components/atoms/CountdownDigits.vue';

export default Vue.extend({
	computed: {
		...mapState('Countdown', ['time', 'isActive']),
		...mapGetters('Countdown', ['minutes', 'seconds']),
	},
	methods: {
	},
	components: {
		CountdownDigits,
	},
});
</script>
