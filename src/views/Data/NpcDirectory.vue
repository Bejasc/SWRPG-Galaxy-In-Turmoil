<template>
	<v-container fluid>
		<v-toolbar dark class="mb-4">
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search for an Item by its name, alias, or category" solo-inverted></v-text-field>

			<v-btn outlined color="blue" disabled class="ma-5">
				Add New
			</v-btn>
		</v-toolbar>
		<v-row>
			<v-col v-for="item in filteredItems" :key="item._id" cols="2">
				<v-card>
					<v-img :src="item.avatar" :lazy-src="item.avatar" contain class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
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

						<v-btn icon v-if="item.combatProperties.weaponSkill > 1">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon v-bind="attrs" v-on="on">mdi-sword-cross</v-icon>
								</template>
								<span>{{ getCombatDescription(item) }}</span>
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
import { INpc, Npc } from "@/types/SwrpgTypes/Npc";
import Vue from "vue";
export default Vue.extend({
	components: {
		Loader,
	},
	data: () => {
		return {
			search: "",
			items: [] as INpc[],
			showLoader: false,
			selectedNpc: {} as INpc,
			allowEdit: false,
		};
	},
	mounted() {
		this.loadItemsFromMongo();
	},
	methods: {
		async loadItemsFromMongo() {
			this.showLoader = true;
			this.items = [];
			this.items = await getFromMongo<INpc>("npcs");
			this.showLoader = false;
		},
		getCombatDescription(npc: INpc) {
			return `AC ${npc.combatProperties?.armorClass} (${npc.combatProperties?.hitpoints} HP).\nLvl ${npc.combatProperties?.weaponSkill} ${npc.combatProperties?.weaponType} (${npc.combatProperties?.hits}x ${npc.combatProperties?.damage.min}-${npc.combatProperties?.damage.max})`;
		},
	},
	computed: {
		filteredItems(): INpc[] {
			return this.items.filter((item: INpc) => {
				return item.name.toLowerCase().includes(this.search.toLowerCase());
				//return npc.tags.some(t => t.toLowerCase().includes(this.search.toLowerCase()));
			});
		},
	},
});
</script>
