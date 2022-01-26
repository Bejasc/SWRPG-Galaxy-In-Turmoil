<template>
	<v-color-picker hide-canvas disabled hide-inputs hide-sliders show-swatches :swatches="swatches" width="100%"></v-color-picker>
</template>

<style scoped>
.v-color-picker__controls {
	display: none;
}
</style>

<script>
export default {
	data: () => {
		return {
			swatches: [["#E6A00E"], ["#1db954"], ["#db4437"], ["#00a4ef"], ["#B0BEC5"], ["#455A64"], ["#263238"]],
		};
	},
	props: {
		selectedValue: String,
	},
};
</script>
