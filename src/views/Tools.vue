<template>
	<v-main class="ma-2">
		<ToolSidebar />

		<v-col cols="10" offset="2">
			<router-view class="ma-2" />
		</v-col>
	</v-main>
</template>

<style scoped>
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
