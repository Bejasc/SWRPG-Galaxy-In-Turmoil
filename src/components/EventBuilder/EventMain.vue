<template>
	<v-expansion-panels accordion>
		<v-expansion-panel class="panel">
			<v-expansion-panel-header>{{ event.embedOptions.title }}</v-expansion-panel-header>
			<div class="float-left" :style="`margin-top:-50px;background-color:${event.embedOptions.color};width:6px;height:100%`"></div>
			<v-expansion-panel-content>
				<v-expansion-panels accordion>
					<v-expansion-panel class="panel">
						<v-expansion-panel-header>Embed Options</v-expansion-panel-header>

						<v-expansion-panel-content>
							<v-form>
								<v-text-field v-model="event.embedOptions.title" label="Event Title" placeholder="Title"></v-text-field>
								<v-textarea v-model="event.embedOptions.description" label="Event Message" placeholder="Message"></v-textarea>
								<v-text-field v-model="event.embedOptions.thumbnail" label="Thumbnail URL" placeholder="Image URL"></v-text-field>
								<v-text-field v-model="event.embedOptions.img" label="Image URL" placeholder="Image URL"></v-text-field>
								<v-color-picker
									v-model="event.embedOptions.color"
									hide-canvas
									hide-inputs
									hide-sliders
									show-swatches
									:swatches="swatches"
									width="100%"
								></v-color-picker>
							</v-form>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<style scoped>
.panel {
	border-left: 5px red;
}
</style>

<script lang="ts">
import Vue from "vue";
import { SwrpgEvent } from "@/types/Event";
export default Vue.extend({
	props: {
		event: SwrpgEvent,
	},
	methods: {},
	data: () => {
		return {
			swatches: [["#E6A00E"], ["#1db954"], ["#db4437"], ["#00a4ef"], ["#B0BEC5"], ["#455A64"], ["#263238"]],
		};
	},
});
</script>
