<template>
	<v-form>
		<v-expansion-panels accordion>
			<v-expansion-panel>
				<v-expansion-panel-header>Embed Options</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-text-field v-model="event.embedOptions.title" label="Event Title" placeholder="Title"></v-text-field>
					<v-textarea v-model="event.embedOptions.description" label="Event Message" placeholder="Message"></v-textarea>
					<v-text-field v-model="event.embedOptions.thumbnail" label="Thumbnail URL" placeholder="Image URL"></v-text-field>
					<v-text-field v-model="event.embedOptions.image" label="Image URL" placeholder="Image URL"></v-text-field>
					<drpg-color-picker :selectedValue="'#E6A00E'"></drpg-color-picker>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { SwrpgEvent } from "@/types/Event";
import DrpgColorPicker from "../DrpgColorPicker.vue";
export default Vue.extend({
	components: {
		DrpgColorPicker,
	},
	data: () => {
		return {};
	},
	props: {
		event: SwrpgEvent,
	},
	methods: {},
});
</script>
