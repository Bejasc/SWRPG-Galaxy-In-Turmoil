<template>
	<v-container fluid>
		<v-toolbar dark>
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search for an NPC by ther name or affiliation" solo-inverted></v-text-field>
		</v-toolbar>
		<v-row>
			<v-col v-for="npc in filteredNpcs" :key="npc.name" cols="3">
				<v-card>
					<v-img :src="npc.avatar" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" @click="npc.getRandomName()">
						<div v-if="npc.verified" class="float-left pa-3">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon color="#91FFFF" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
								</template>
								<span>Thie NPC exists in the SWRPG Database, and can be used with the '^!npc' command</span>
							</v-tooltip>
						</div>

						<v-icon class="float-right pa-3">mdi-dots-vertical</v-icon>
					</v-img>

					<v-card-actions>
						<span class="subtitle-1">
							{{ npc.name }}
						</span>

						<v-spacer />

						<v-btn v-if="npc.isCombatant" icon>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon v-bind="attrs" v-on="on">mdi-sword-cross</v-icon>
								</template>
								<span>This NPC is preconfigured for combat.</span>
							</v-tooltip>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { NPC_LIST, Npc, INpc } from "@/types/Npcs/Npc";
import Vue from "vue";
export default Vue.extend({
	name: "Item Directory",
	components: {
		// VueCodeHighlight,
		// DiscordEmbed,
	},
	data: () => {
		return {
			search: "",
			npcs: [...NPC_LIST.map(e => new Npc(e))],
		};
	},
	computed: {
		filteredNpcs(): INpc[] {
			return this.npcs.filter((npc: Npc) => {
				return npc.tags.some(t => t.toLowerCase().includes(this.search.toLowerCase()));
			});
		},
	},
});
</script>
