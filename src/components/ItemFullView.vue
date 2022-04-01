<template>
	<v-row justify="center">
		<v-dialog v-model="show" max-width="800px">
			<v-card>
				<v-card-title>
					<span class="text-h5">Item</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row class="pt-4">
							<v-col sm="8">
								<v-col sm="8">
									<v-text-field v-model="item.name" v-if="allowEdit" label="Name*" outlined dense required></v-text-field>
									<v-text-field v-else label="Name*" readonly outlined dense :value="item.name"></v-text-field>
								</v-col>
								<v-col sm="4">
									<v-text-field v-model="item.category" v-if="allowEdit" label="Category" outlined dense required></v-text-field>
									<v-text-field v-model="item.category" v-else label="Category" readonly outlined dense required></v-text-field>
								</v-col>
								<v-col sm="8">
									<v-text-field v-model="aliasString" v-if="allowEdit" label="Aliases" outlined dense></v-text-field>
									<v-text-field v-else label="Aliases" readonly outlined dense required :value="getItemAliases()"></v-text-field>
								</v-col>
								<v-col sm="4">
									<v-text-field
										v-model="item.encumbrance"
										v-if="allowEdit"
										label="Encumbrance"
										type="number"
										outlined
										dense
										step="0.1"
										min="0"
										max="40"
									></v-text-field>
									<v-text-field v-model="item.encumbrance" v-else label="Encumbrance" readonly outlined dense></v-text-field>
								</v-col>
								<v-col sm="12">
									<v-textarea v-model="item.description" v-if="allowEdit" label="Description" dense required outlined></v-textarea>
									<v-textarea v-else label="Description*" readonly dense outlined required :value="item.description"></v-textarea>
								</v-col>
							</v-col>
							<v-col sm="4">
								<img :src="item.image" v-if="item.image" class="itemThumbnail" @click="changeItemImage()" />
								<img
									v-else
									src="https://cdn.discordapp.com/attachments/864064937521184788/864476989196468264/badge_random.png"
									alt=""
									class="itemThumbnail"
									@click="changeItemImage()"
								/>
							</v-col>
						</v-row>
					</v-container>
					<!-- <small>*indicates required field</small> -->
				</v-card-text>
				<v-card-actions>
					<small style="opacity:0.2">Item ID: {{ item._id }}</small>

					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="$emit('closeFullView')">
						Close
					</v-btn>
					<v-btn v-if="allowEdit" color="green darken-1" :disabled="!item.name || !item.category || !item.encumbrance" text @click="saveNewItem()">
						Save
					</v-btn>
					<!-- <v-btn color="blue darken-1" text @click="show = false">
						Save
					</v-btn> -->
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<style>
.itemThumbnail {
	object-fit: contain;
	max-width: 220px;
	max-height: 220px;
	object-position: center;
	margin: 0 auto;
}
</style>

<script lang="ts">
import { pushToMongo } from "@/plugins/MongoConnector";
import { Item, IItem } from "@/types/SwrpgTypes/Item";
import Vue from "vue";
export default Vue.extend({
	props: {
		show: Boolean,
		item: Item,
		allowEdit: Boolean,
	},
	data: () => {
		return {
			aliasString: "",
		};
	},
	methods: {
		getItemAliases() {
			return this.item.aliases?.join(", ");
		},
		async saveNewItem() {
			(this.$parent as any).showLoader = true;
			const a = this.aliasString.replace(" ", "").split(",");

			console.log(a);
			this.item.aliases = a;
			console.log(this.item.aliases);
			await pushToMongo<IItem>("items", this.item, false);

			this.$emit("itemAdded", this.item);
			(this.$parent as any).showLoader = false;
			// this.item.aliases = this.aliasString.replace(" ", "").split(",");
			// if (this.item.aliases.length == 0) this.item.aliases.push(this.item.name.toLowerCase().replace(" ", ""));

			// await pushToMongo<IItem>("items", this.item);

			// this.$emit("itemAdded", this.item);
		},
		changeItemImage() {
			const imageUrl = prompt("Enter the URL for the new image", this.item.image);
			if (imageUrl != null) this.item.image = imageUrl;
		},
	},
});
</script>
