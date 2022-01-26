<template>
	<v-expansion-panels accordion class="overflow-auto">
		<v-expansion-panel class="overflow-auto">
			<v-expansion-panel-header>{{ eventLink.optionText }}</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-container fluid>
					<v-row>
						<v-col cols="9">
							<v-text-field label="Title" v-model="eventLink.optionText"></v-text-field>
						</v-col>
						<v-col cols="3">
							<v-text-field label="Reaction" v-model="eventLink.reaction" @click.native="showPicker = !showPicker"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<v-text-field label="Description" placeholder="Provide som extra context or description" v-model="eventLink.optionDescription"></v-text-field>

				<!-- <VEmojiPicker v-show="showPicker" class="dark" :style="{ width: '440px', height: '150' }" @select="selectEmoji" /> -->
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
// import { VEmojiPicker } from "v-emoji-picker";
import { IEventLink } from "@/types/Event";
export default Vue.extend({
	name: "EmojiPicker",
	components: {
		// VEmojiPicker,
	},
	data: () => {
		return {
			showPicker: false,
			selectedEmoji: "",
		};
	},
	props: {
		eventLink: Object as () => IEventLink,
	},
	methods: {
		selectEmoji(emoji: any) {
			this.eventLink.reaction = emoji.data;
			this.showPicker = false;
		},
	},
});
</script>
