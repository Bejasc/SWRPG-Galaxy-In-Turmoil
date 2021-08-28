<template>
	<v-main>
		<section id="docs">
			<v-parallax src="@/assets/hoth.png" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Tools</h1>
				</v-layout>
			</v-parallax>

			<v-container fill-height fluid>
				<v-row align="center" justify="center">
					<v-col cols="5">
						<v-card>
							<h1>New Item</h1>
							<v-form class="pa-6 ma-2">
								<v-text-field v-model="item.name" label="Item Name" placeholder="Bantha Fodder"></v-text-field>
								<v-textarea v-model="item.description" label="Item Description"></v-textarea>
								<v-text-field v-model="item.image" label="Image URL" placeholder="Enter the URL for your image"></v-text-field>
								<v-img :src="item.image"></v-img>

								<v-dialog v-model="dialog" width="500">
									<template v-slot:activator="{ on, attrs }">
										<v-btn color="success" dark v-bind="attrs" v-on="on" v-on:click="saveItem()">
											Save Item
										</v-btn>
									</template>

									<v-card>
										<v-card-title class="text-h5 ">
											{{ item.name }}
										</v-card-title>

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
		</section>
	</v-main>
</template>

<style>
.v-application code {
	background-color: unset;
}
</style>

<script>
import { Item } from "@/types/Item";
import { component as VueCodeHighlight } from "vue-code-highlight";
export default {
	name: "Tools",
	components: {
		VueCodeHighlight,
	},
	data: () => {
		return {
			item: new Item(),
			dialog: false,
			itemJson: "",
			timeout: 4000,
			snackbar: false,
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
	},
	filters: {
		pretty: function(value) {
			if (!value) return;
			return JSON.stringify(JSON.parse(value), null, 2);
		},
	},
};
</script>
