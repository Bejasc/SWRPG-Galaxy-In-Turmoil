<template>
	<v-expansion-panels accordion class="overflow-auto" inset>
		<v-expansion-panel class="overflow-auto">
			<v-expansion-panel-header>{{ event.embedOptions.title }}</v-expansion-panel-header>
			<div class="float-left" :style="`margin-top:-50px;background-color:${event.embedOptions.color};width:6px;height:100%`"></div>
			<v-expansion-panel-content>
				<v-expansion-panels>
					<v-expansion-panel>
						<v-expansion-panel-header class="blue-grey darken-1 font-weight-medium">Embed Options</v-expansion-panel-header>
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
					<v-expansion-panel>
						<v-expansion-panel-header class="blue-grey darken-1 font-weight-medium">Event Links</v-expansion-panel-header>
						<v-expansion-panel-content>
							<event-link v-for="(link, i) in event.eventLinks" :key="i" :eventLink="link"></event-link>
							<div class="text-center">
								<v-btn class="ma-2" small outlined fab color="white" @click="addEventLink">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
import { SwrpgEvent } from "@/types/Event";
import EventLink from "./EventLink.vue";
export default Vue.extend({
	components: { EventLink },
	props: {
		event: SwrpgEvent,
	},
	methods: {
		addEventLink() {
			this.event.eventLinks.push({
				event: [new SwrpgEvent()],
				optionText: "New Option",
				optionDescription: "",
			});
		},
	},
	data: () => {
		return {
			swatches: [["#E6A00E"], ["#1db954"], ["#db4437"], ["#00a4ef"], ["#B0BEC5"], ["#455A64"], ["#263238"]],
		};
	},
});
</script>
