<template>
	<v-container fluid>
		<v-toolbar dark>
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search by Tags" solo-inverted></v-text-field>
		</v-toolbar>
		<v-row>
			<v-col v-for="img in blobs" :key="img.t" cols="2">
				<v-hover v-slot="{ hover }">
					<v-card :elevation="hover ? 12 : 2">
						<v-img :src="img.url" :lazy-src="img.rul" height="200px" contain class="{'on-hover':hover}">
							<template v-if="hover">
								<div v-if="isAdminMode()" class="float-left pa-3">
									<v-icon color="#ff0000">mdi-delete</v-icon>
								</div>
							</template>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
	<!-- <v-container fluid>
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
	</v-container> -->
</template>

<script lang="ts">
import Vue from "vue";
import { getAzureContainer } from "@/plugins/AzureConnector";
import { IAzureImage } from "@/types/AzureImage";
export default Vue.extend({
	name: "HookBuilder",
	components: {},
	data: () => {
		return {
			search: "",
			url: "",
			file: "",
			tags: "",
			rules: [(value: { size: number }) => !value || value.size < 4000000 || "File size should be less than 4 MB!"],
			blobs: [] as IAzureImage[],
		};
	},

	mounted() {
		this.loadBlobs();
	},
	methods: {
		async loadBlobs() {
			const containerCllient = await getAzureContainer();

			const iter = containerCllient.listBlobsFlat();
			let blobItem = await iter.next();

			const t: IAzureImage[] = [];
			let i = 0;
			while (!blobItem.done) {
				const blobClient = containerCllient.getBlobClient(blobItem.value.name);
				const e: IAzureImage = {
					id: i,
					name: blobItem.value.name,
					url: blobClient.url,
				};

				t.push(e);
				i++;

				blobItem = await iter.next();
			}

			this.blobs = t;
		},
		onFileChange(e: string | undefined) {
			if (e != undefined) {
				this.url = URL.createObjectURL(e);
				this.file = e;
			} else {
				this.url = "";
				this.file = "";
			}
		},
		async uploadFile() {
			/*
			const containerClient = await getAzureContainer();

			//TODO split tags on comma, and treat as separate tag
			const splitTags = this.tags;

			this.toDataURL(
				this.url,
				async function(d: string, f: string, t: string) {
					const blockBlobClient = containerClient.getBlockBlobClient(f);

					const matches = d.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);
					if (matches) {
						const buffer = new Buffer(matches[2], "base64");

						await blockBlobClient.upload(buffer, buffer.byteLength, { tags: { t: t } });
					}
				},
				this.file.name,
				splitTags,
			);

			alert("File uploaded");
			*/
		},
		toDataURL: function(url: string, callback: any, fileName: string, tags: string) {
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
		isAdminMode() {
			if (this.$route.query.admin === "1") return true;
			else return false;
		},
	},
});
</script>
