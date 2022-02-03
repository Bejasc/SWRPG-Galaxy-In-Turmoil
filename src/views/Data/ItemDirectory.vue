<template>
	<v-container fluid>
		<v-toolbar dark class="mb-4">
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search for an Item by its name, alias, or category" solo-inverted></v-text-field>
		</v-toolbar>
		<v-row>
			<v-col v-for="item in filteredItems" :key="item._id" cols="2">
				<v-card>
					<v-img :src="item.image" contain class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
						<!-- <div v-if="item.isVerified" class="float-left pa-3">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon color="#91FFFF" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
								</template>
								<span>Thie Item exists in the SWRPG Database</span>
							</v-tooltip>
						</div> -->

						<!-- <v-icon class="float-right pa-3">mdi-dots-vertical</v-icon> -->
					</v-img>

					<v-card-actions>
						<span class="subtitle-1">
							{{ item.name }}
						</span>

						<v-spacer />

						<v-btn icon>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon v-bind="attrs" v-on="on">mdi-shape</v-icon>
								</template>
								<span>{{ item.category }}</span>
							</v-tooltip>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<loader :showLoader="showLoader" />
	</v-container>
</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import { getFromMongo } from "@/plugins/MongoConnector";
import { IItem } from "@/types/Item";
import Vue from "vue";
export default Vue.extend({
	name: "HookBuilder",
	components: {
		Loader,
		// VueCodeHighlight,
		// DiscordEmbed,
	},
	data: () => {
		return {
			search: "",
			items: [] as IItem[],
			showLoader: false,
		};
	},
	mounted() {
		this.showLoader = true;
		this.loadItemsFromMongo();
	},
	methods: {
		async loadItemsFromMongo() {
			this.items = await getFromMongo<IItem>("items");
			this.showLoader = false;
		},
	},
	computed: {
		filteredItems(): IItem[] {
			return this.items.filter((item: IItem) => {
				return (
					item.name.toLowerCase().includes(this.search.toLowerCase()) ||
					item.aliases.some(e => e.toLowerCase().includes(this.search.toLowerCase())) ||
					item.category.toLowerCase().includes(this.search.toLowerCase())
				);
				//return npc.tags.some(t => t.toLowerCase().includes(this.search.toLowerCase()));
			});
		},
	},
});
</script>
