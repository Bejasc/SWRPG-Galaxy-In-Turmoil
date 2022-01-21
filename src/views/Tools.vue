<template>
	<v-main>
		<section id="Tools">
			<v-parallax src="@/assets/hoth.png" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Tools</h1>
				</v-layout>
			</v-parallax>

			<quest-item-creator />
		</section>
	</v-main>
</template>

<style>
.v-application code {
	background-color: unset;
}
</style>

<script>
import QuestItemCreator from "@/components/QuestItemCreator.vue";
export default {
	name: "Tools",
	components: {
		QuestItemCreator,
	},
};
</script>
