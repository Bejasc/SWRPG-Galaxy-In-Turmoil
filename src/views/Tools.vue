<template>
	<v-main>
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
