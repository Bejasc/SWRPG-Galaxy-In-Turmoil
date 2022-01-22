<template>
	<v-container fluid>
		<v-row>
			<v-col cols="3">
				<v-card>
					<div style="background-color:#0a0a0a" @click="$refs.fileInput.$refs.input.click()">
						<v-img :v-if="url" :src="url" class="white--text" contain height="200px" />
					</div>
					<div class="px-4 mt-10">
						<v-file-input
							ref="fileInput"
							prepend-icon=""
							label="Upload File"
							:rules="rules"
							outlined
							dense
							show-size
							placeholder="Upload File"
							accept="image/*"
							@change="onFileChange"
						></v-file-input>
						<v-text-field v-model="tags" label="Tags" outlined dense placeholder="Enter a list of tags for the image, separated by comma"></v-text-field>
					</div>
					<v-card-actions>
						<v-btn @click="uploadFile">
							Upload
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Vue from "vue";
import { BlobClient, BlobServiceClient } from "@azure/storage-blob";
export default Vue.extend({
	name: "HookBuilder",
	components: {},
	data: () => {
		return {
			url: null,
			file: null,
			tags: null,
			rules: [value => !value || value.size < 4000000 || "File size should be less than 4 MB!"],
		};
	},
	methods: {
		onFileChange(e) {
			if (e != undefined) {
				this.url = URL.createObjectURL(e);
				this.file = e;
			} else {
				this.url = null;
				this.file = null;
			}
		},

		async uploadFile() {
			const azureStore =
				"https://drpg.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-01-22T22:26:27Z&st=2022-01-22T14:26:27Z&spr=https&sig=oLeIJqfCvBk2JzWrcgdcCivZk%2BVFe1EkqkJuFFc%2Bfgo%3D";

			const blobServiceClient = new BlobServiceClient(azureStore);
			const containerName = "swrpg-images";
			const containerClient = blobServiceClient.getContainerClient(containerName);

			await containerClient.createIfNotExists();

			//TODO split tags on comma, and treat as separate tag
			const splitTags = this.tags;

			await this.toDataURL(
				this.url,
				async function(d, f, t) {
					const blockBlobClient = containerClient.getBlockBlobClient(f);

					const matches = d.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);
					const buffer = new Buffer(matches[2], "base64");

					await blockBlobClient.upload(buffer, buffer.byteLength, { tags: { t: t } });
				},
				this.file.name,
				splitTags,
			);

			alert("File uploaded");
		},
		toDataURL: function(url, callback, fileName, tags) {
			const xhr = new XMLHttpRequest();
			xhr.onload = function() {
				const reader = new FileReader();
				reader.onloadend = function() {
					callback(reader.result, fileName, tags);
				};
				reader.readAsDataURL(xhr.response);
			};
			xhr.open("GET", url);
			xhr.responseType = "blob";
			xhr.send();
		},
	},
});
</script>
