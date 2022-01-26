<template @keydown.esc="closeOverlay()">
	<v-col cols="5">
		<v-card>
			<v-card-title
				>{{ parentEvent.embedOptions.title }}
				<v-spacer></v-spacer>
				<v-btn class="ma-1" outlined color="red">Clear</v-btn>
				<v-btn class="ma-1" outlined color="green">Export</v-btn>
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
});
</script>
