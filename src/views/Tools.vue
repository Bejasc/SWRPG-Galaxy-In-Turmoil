<template>
	<v-main>
		<!-- <section id="docs">
			<v-parallax src="@/assets/tatooine.jpg" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Documentation</h1>
				</v-layout>
			</v-parallax>
		</section> -->

		<v-col cols="12" class="ma-0 pa-0">
			<v-row fill-height>
				<v-col cols="2" class="ma-0 pa-0">
					<ToolSidebar />
				</v-col>
			</v-row>
		</v-col>
	</v-main>
</template>

<style>
.v-application code {
	background-color: unset;
}
</style>

<script>
// import QuestItemCreator from "@/components/QuestItemCreator.vue";
import ToolSidebar from "@/components/ToolSidebar.vue";
export default {
	name: "Tools",
	components: { ToolSidebar },
};
</script>
