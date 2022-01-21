<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col cols="5">
				<v-card>
					<v-card-title>Quest Item Creator</v-card-title>
					<v-form class="pa-6 ma-2">
						<v-text-field v-model="item.name" label="Item Name" placeholder="Item Name"></v-text-field>
						<v-textarea v-model="item.description" label="Item Description" placeholder="Item Description"></v-textarea>
						<v-text-field v-model="item.image" label="Image URL" placeholder="Image URL"></v-text-field>
						<v-text-field v-model="item.encumbrance" label="Item Encumbrance" type="number" step="0.1" :min="minEncumbrance" :max="maxEncumbrance"></v-text-field>

						<v-row justify="space-around">
							<discord-embed color="#0099ff" :title="item.name" :thumbnail="item.image">
								<span v-if="item.description">
									{{ item.description }}
								</span>
								<span v-else>
									Not much is known about this item.
								</span>
								<discord-embed-fields slot="fields">
									<discord-embed-field title="Encumbrance">{{ item.encumbrance }}</discord-embed-field>
									<!-- <discord-embed-field title="Type" inline>{{ item.encumbrance }}</discord-embed-field>
									<discord-embed-field title="Tradeable" inline>{{ item.encumbrance }}</discord-embed-field>
									<discord-embed-field title="Base Value" inline>450 Credits</discord-embed-field> -->
								</discord-embed-fields>
								<span slot="footer">This is an *example* of how the item embed will look</span>
							</discord-embed>
						</v-row>

						<v-dialog v-model="dialog" width="500">
							<template v-slot:activator="{ on, attrs }">
								<v-row justify="space-around">
									<v-btn color="success" dark v-bind="attrs" v-on="on" v-on:click="saveItem()">
										Get Item Code
									</v-btn>
									<v-btn color="primary" dark v-on:click="clearForm()">
										Clear Form
									</v-btn>
								</v-row>
							</template>

							<v-card>
								<vue-code-highlight language="json">
									<pre>{{ itemJson }}</pre>
								</vue-code-highlight>

								<v-card-actions>
									<v-btn color="red" text @click="dialog = false">
										Close
									</v-btn>
									<v-btn color="blue" text @click="copyToClipboard">
										Copy to Clipboard
									</v-btn>
								</v-card-actions>
								<v-snackbar v-model="snackbar" :timeout="timeout"> {{ item.name }} was copied to clipboard </v-snackbar>
							</v-card>
						</v-dialog>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { Item } from "@/types/Item";
import { component as VueCodeHighlight } from "vue-code-highlight";
import DiscordEmbed from "./DiscordEmbed.vue";
import DiscordEmbedFields from "./DiscordEmbedFields.vue";
import DiscordEmbedField from "./DiscordEmbedField.vue";
export default {
	name: "QuestItemCreator",
	components: {
		VueCodeHighlight,
		DiscordEmbed,
		DiscordEmbedFields,
		DiscordEmbedField,
	},
	data: () => {
		return {
			item: new Item(),
			dialog: false,
			itemJson: "",
			timeout: 4000,
			minEncumbrance: 0,
			maxEncumbrance: 40,
			snackbar: false,
			encumbranceValidator: [v => v < 0 || "Value cannot be less than 0"],
		};
	},
	methods: {
		saveItem() {
			const itemAsJson = JSON.stringify(this.item, null, "\t");
			this.itemJson = itemAsJson;
			console.log(itemAsJson);
		},
		copyToClipboard() {
			this.snackbar = true;
			navigator.clipboard.writeText(this.itemJson);
		},
		clearForm() {
			this.item = new Item();
		},
	},
	filters: {
		pretty: function(value) {
			if (!value) return;
			return JSON.stringify(JSON.parse(value), null, 2);
		},
	},
};
</script>
