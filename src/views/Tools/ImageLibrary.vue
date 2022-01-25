<template @keydown.esc="closeOverlay()">
	<v-container fluid>
		<v-toolbar dark>
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search by Tags" solo-inverted></v-text-field>
			<v-btn v-if="isAdminMode()" class="ma-5" @click="bulkDeleteBlobs()">
				<v-icon color="red">mdi-delete</v-icon>
				Delete {{ selectedCount }}
			</v-btn>
		</v-toolbar>

		<v-row>
			<v-col v-for="img in filteredImages" :key="img.t" cols="2">
				<drpg-image :adminMode="isAdminMode()" :blob="img" @clicked="openFullView(img)"></drpg-image>
			</v-col>

			<v-overlay v-model="overlay" opacity="0.9" @click.native="closeOverlay" @keydown.native.esc="closeOverlay">
				<img :src="selectedImage.url" />
			</v-overlay>
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
import Vue from "vue";
import { deleteBlobByName, getAzureContainer } from "@/plugins/AzureConnector";
import { AzureImage, IAzureImage } from "@/types/AzureImage";
import DrpgImage from "@/components/DrpgImage.vue";
export default Vue.extend({
	name: "HookBuilder",
	components: { DrpgImage },
	data: () => {
		return {
			search: "",
			url: "",
			file: "",
			rules: [(value: { size: number }) => !value || value.size < 4000000 || "File size should be less than 4 MB!"],
			blobs: [] as IAzureImage[],
			overlay: false,
			selectedImage: {} as AzureImage,
		};
	},
	computed: {
		selectedCount() {
			return this.blobs.filter(x => x.isChecked == true).length;
		},
		filteredImages(): AzureImage[] {
			if (this.search == "") return this.blobs.map(e => new AzureImage(e));

			const matchingBlobs = this.blobs.filter(x => {
				return x.tags.some(t => t.toLowerCase().includes(this.search.toLowerCase()));
			});

			return matchingBlobs.map(e => new AzureImage(e));
		},
	},
	mounted() {
		this.loadBlobs();
	},
	methods: {
		closeOverlay() {
			this.overlay = false;
		},
		openFullView(img: AzureImage) {
			console.log("a");
			this.overlay = true;
			this.selectedImage = img;
		},
		async deleteBlob(img: IAzureImage) {
			this.blobs = this.blobs.filter(x => x != img);

			console.log(`Deleted ${img.name}`);
			await deleteBlobByName(img.name);
		},
		async bulkDeleteBlobs() {
			const filteredblobs = this.blobs.filter(x => x.isChecked);

			let counter = 0;
			await Promise.all(
				filteredblobs.map(async x => {
					await this.deleteBlob(x);
					counter++;
				}),
			);
			alert(`Deleted ${counter} images`);
		},
		async loadBlobs() {
			const containerCllient = await getAzureContainer();

			const iter = containerCllient.listBlobsFlat({ includeTags: true });
			let blobItem = await iter.next();

			const t: IAzureImage[] = [];
			let i = 0;
			while (!blobItem.done) {
				const blobClient = containerCllient.getBlobClient(blobItem.value.name);

				let tags: string[] = [];
				if (blobItem.value.tags) {
					tags = Object.keys(blobItem.value.tags);
				}

				const e: IAzureImage = new AzureImage({
					id: i,
					tags: tags.filter(x => x != "set"),
					name: blobItem.value.name,
					url: blobClient.url,
					isChecked: false,
				});

				t.push(e);
				i++;

				blobItem = await iter.next();
			}

			this.blobs = t; //.slice(0, 10);
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
