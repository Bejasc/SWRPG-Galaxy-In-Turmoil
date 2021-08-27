<template>
	<v-list>
		<v-list-group no-action>
			<template v-slot:activator>
				<v-list-item-content>
					<v-list-item-title>Content Creation</v-list-item-title>
				</v-list-item-content>
			</template>
			<v-list-item>
				<v-list-item-title>Item Creator</v-list-item-title>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "ToolSidebar",
});
</script>
