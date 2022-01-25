<template>
	<v-hover v-slot="{ hover }">
		<v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
			<v-img :src="blob.url" :lazy-src="blob.url" height="225px" contain>
				<v-checkbox class="float-left pa-3" v-if="adminMode" v-model="blob.isChecked"></v-checkbox>

				<div class="float-right pa-3">
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark icon v-bind="attrs" v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>

						<!-- <v-list>
							<v-list-item
								@click.stop="
									selectedBlob = img;
									dialog = true;
								"
								><v-list-item-title>Modify Tags</v-list-item-title></v-list-item
							>
						</v-list> -->

						<v-dialog v-model="dialog" max-width="290">
							<v-card>
								<v-card-title class="text-h5">
									{{ blob.name }}
								</v-card-title>

								<v-col cols="12">
									<v-text-field v-model="blob.tags" label="Tags"></v-text-field>
								</v-col>

								<v-card-actions>
									<v-spacer></v-spacer>

									<v-btn color="red darken-1" text @click="dialog = false">
										Cancel
									</v-btn>

									<v-btn color="green darken-1" text @click="alert('TODO')">
										Save
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-menu>
				</div>

				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
				<v-btn v-if="blob.tags" icon class="pa-3" style="opacity:0.6">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" color="#91FFFF" v-on="on">mdi-tag</v-icon>
						</template>
						<span>{{ blob.tags != null ? blob.tags : "No Tags" }}</span>
					</v-tooltip>
				</v-btn>
			</v-img>
		</v-card>
	</v-hover>
</template>

<script lang="ts">
import { IAzureImage } from "@/types/AzureImage";
import Vue from "vue";
export default Vue.extend({
	data: () => {
		return {
			dialog: true,
		};
	},
	props: {
		adminMode: {
			type: Boolean,
			default: false,
		},
		blob: Object as () => IAzureImage,
	},
});
</script>
