<template>
	<v-color-picker :value="value" @input="print" hide-canvas hide-inputs hide-sliders show-swatches :swatches="swatches" width="100%"></v-color-picker>
	<!-- <v-color-picker :value="value" hide-canvas hide-inputs hide-sliders show-swatches :swatches="swatches" width="100%"></v-color-picker> -->
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		value: String,
	},
	data: () => {
		return {
			data: "",
			swatches: [["#E6A00E"], ["#1db954"], ["#db4437"], ["#00a4ef"], ["#B0BEC5"], ["#455A64"], ["#263238"]],
		};
	},
	methods: {
		print(obj: string) {
			this.$emit("colorUpdated", obj);
		},
	},
});
</script>
