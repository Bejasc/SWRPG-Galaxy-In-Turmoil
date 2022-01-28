<template @keydown.esc="closeOverlay()">
	<v-col cols="12">
		<v-card>
			<v-card-title
				>{{ parentEvent.embedOptions.title }}
				<v-spacer></v-spacer>
				<v-btn class="ma-1" outlined color="red" @click="resetEvent">Clear</v-btn>
				<v-btn class="ma-1" outlined color="green" @click="exportEvent">Export</v-btn>
			</v-card-title>

			<event-main :event="parentEvent"></event-main>
		</v-card>
	</v-col>
</template>

<style>
.v-alert {
	position: fixed;
	left: 50%;
	bottom: 50px;
	transform: translate(-50%, -50%);
	margin: 0 auto;
}
</style>

<script lang="ts">
import EventMain from "@/components/EventBuilder/EventMain.vue";
import { SwrpgEvent } from "@/types/Event";
import Vue from "vue";
export default Vue.extend({
	components: { EventMain },
	name: "EventBuilder",
	data: () => {
		return {
			parentEvent: new SwrpgEvent(),
		};
	},
	methods: {
		exportEvent() {
			const eventAsJson = JSON.stringify(this.parentEvent, null, "\t");
			navigator.clipboard.writeText(eventAsJson);
		},
		resetEvent() {
			this.parentEvent = new SwrpgEvent();
		},
	},
});
</script>
