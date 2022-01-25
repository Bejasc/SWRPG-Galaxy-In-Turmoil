<template>
	<v-hover v-slot="{ hover }">
		<v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
			<v-alert transition="fade-transition" style="z-index:999!important" v-model="clipboardAlert" type="success">Image URL was copied to Clipboard</v-alert>
			<v-alert transition="fade-transition" style="z-index:999!important" v-model="tagUpdatedAlert" type="info">{{ tagUpdatedMessage }}</v-alert>

			<v-img :src="blob.url" :lazy-src="blob.url" height="225px" contain @click="openFullView()">
				<v-checkbox class="float-left pa-3" v-if="adminMode" v-model="blob.isChecked"></v-checkbox>

				<div class="float-right pa-3">
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark icon v-bind="attrs" v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="copyImageToClipboard"><v-list-item-title>Copy Image URL</v-list-item-title></v-list-item>
							<v-list-item @click="dialog = true"><v-list-item-title>Modify Tags</v-list-item-title></v-list-item>
						</v-list>
					</v-menu>

					<v-dialog v-model="dialog" max-width="800">
						<v-card>
							<v-card-title class="text-h5">
								{{ blob.name }}
							</v-card-title>

							<v-col cols="12">
								<v-text-field v-model="tagsText" label="Tags"></v-text-field>
							</v-col>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="red darken-1" text @click="dialog = false">
									Cancel
								</v-btn>
								<v-btn color="green darken-1" text @click="updateTags()">
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>

				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
				<v-btn v-if="blob.hasTags" icon class="pa-3" style="opacity:0.6">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" color="#91FFFF" v-on="on">mdi-tag</v-icon>
						</template>
						<span>{{ blob.displayTags() }}</span>
					</v-tooltip>
				</v-btn>
			</v-img>
		</v-card>
	</v-hover>
</template>

<script lang="ts">
import { updateBlobTags } from "@/plugins/AzureConnector";
import { AzureImage } from "@/types/AzureImage";
import Vue from "vue";
export default Vue.extend({
	data: () => {
		return {
			dialog: false,
			tagsText: "",
			clipboardAlert: false,
			tagUpdatedMessage: "",
			tagUpdatedAlert: false,
		};
	},
	props: {
		adminMode: {
			type: Boolean,
			default: false,
		},
		blob: AzureImage,
	},
	mounted() {
		this.tagsText = this.blob.displayTags();
	},
	methods: {
		async showTagUpdatedAlert() {
			this.tagUpdatedMessage = `Tags for ${this.blob.name} were updated`;
			this.tagUpdatedAlert = true;
			setTimeout(() => {
				this.tagUpdatedAlert = false;
			}, 3000);
		},
		async copyImageToClipboard() {
			navigator.clipboard.writeText(this.blob.url);
			this.clipboardAlert = true;
			setTimeout(() => {
				this.clipboardAlert = false;
			}, 3000);
		},
		openFullView() {
			this.$emit("clicked", this.blob);
		},
		async updateTags() {
			const newTags = this.blob.parseTags(this.tagsText);
			this.blob.tags = newTags;

			const tagRecords: Record<string, string> = {};

			this.blob.tags.map(e => {
				tagRecords[`${e.trim()}`] = e.trim();
			});

			await updateBlobTags(this.blob.name, tagRecords);
			this.tagsText = this.blob.displayTags();

			this.dialog = false;

			this.showTagUpdatedAlert();
		},
	},
});
</script>
