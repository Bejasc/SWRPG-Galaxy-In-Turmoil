<template>
	<v-container fluid>
		<v-toolbar dark class="mb-4">
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search for an Item by its name, alias, or category" solo-inverted></v-text-field>

			<v-btn outlined color="blue" class="ma-5" @click="openFullView(null, true)">
				Add New
			</v-btn>
		</v-toolbar>
		<v-row>
			<v-col v-for="item in filteredItems" :key="item._id" cols="2">
				<v-card>
					<v-img :src="item.avatar" :lazy-src="item.avatar" contain class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
						<!-- <v-icon class="float-right pa-3">mdi-dots-vertical</v-icon> -->
						<div v-if="!item.isCustomNpc" class="float-left pa-3">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon color="#91FFFF" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
								</template>
								<span>Thie NPC exists in the Base SWRPG files.</span>
							</v-tooltip>
						</div>
					</v-img>

					<v-card-actions>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<span v-bind="attrs" v-on="on" class="subtitle-1">
									{{ item.name }}
								</span>
							</template>
							<span>{{ item.aliases.join(", ") }}</span>
						</v-tooltip>

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
		<npc-full-view :show="showFullView" :item="selectedNpc" :allowEdit="allowEdit" @itemAdded="addItem($event)" @closeFullView="closeView()"></npc-full-view>
		<loader :showLoader="showLoader" />
	</v-container>
</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import NpcFullView from "@/components/NpcFullView.vue";
import { getFromMongo } from "@/plugins/MongoConnector";
import { INpc, Npc } from "@/types/SwrpgTypes/Npc";
import Vue from "vue";
export default Vue.extend({
	components: {
		Loader,
		NpcFullView,
	},
	data: () => {
		return {
			search: "",
			items: [] as INpc[],
			showFullView: false,
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
		openFullView(npc: INpc, allowEdit = false) {
			if (!npc) npc = new Npc();
			this.selectedNpc = npc;
			this.showFullView = true;
			this.allowEdit = allowEdit;
		},
		closeView() {
			this.showFullView = false;
		},
		addItem(item: IItem) {
			this.showFullView = false;

			this.items.push(item);
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
