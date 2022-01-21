<template>
	<v-main>
		<ToolSidebar />

		<v-col cols="10" offset="2">
			<router-view />
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
