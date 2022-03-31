<template>
	<v-dialog v-model="showLoader" fullscreen>
		<v-container :v-model="showLoader" fill-height>
			<v-overlay color="black">
				<v-layout text-xs-center style="height: 100px;">
					<!-- <v-flex xs9 offset-1> -->
					<v-layout column align-center justify-center>
						<v-progress-circular :size="50" color="amber" indeterminate> </v-progress-circular>
						<div class="ma-4">
							{{ randomLoadMessage() }}
						</div>
					</v-layout>
					<!-- </v-flex> -->
				</v-layout>
			</v-overlay>
		</v-container>
	</v-dialog>
</template>

,
<script lang="ts">
import Vue from "vue";
import loadMessages from "@/data/loadMessages.json";
export default Vue.extend({
	name: "DrpgLoader",
	props: {
		showLoader: Boolean,
	},
	methods: {
		randomLoadMessage() {
			const m = loadMessages as string[];

			const rnd = m[Math.floor(Math.random() * m.length)];
			return `${rnd}...` ?? "Loading";
		},
	},
});
</script>
