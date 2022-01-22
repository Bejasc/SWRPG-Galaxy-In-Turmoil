<template>
	<v-container fluid>
		<v-toolbar dark>
			<v-toolbar-title>Search</v-toolbar-title>
			<v-text-field class="mx-4" v-model="search" clearable rounded flat hide-details label="Search for an NPC by ther name or affiliation" solo-inverted></v-text-field>
		</v-toolbar>
		<v-row dense>
			<v-col v-for="npc in filteredNpcs" :key="npc.name" cols="2">
				<v-card>
					<v-img :src="npc.avatar" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" @click="npc.getRandomName()">
						<v-card-title v-text="npc.name"></v-card-title>
					</v-img>

					<v-card-actions>
						<v-chip :color="npc.faction.color">
							<v-icon left>
								mdi-account-group
							</v-icon>
							{{ npc.faction.name }}
						</v-chip>

						<v-spacer />

						<v-btn icon>
							<v-icon>mdi-chat-alert</v-icon>
						</v-btn>

						<v-btn icon>
							<v-icon>mdi-sword-cross</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { NPC_LIST, Npc } from "@/types/Npcs/Npc";
// import { component as VueCodeHighlight } from "vue-code-highlight";
// import DiscordEmbed from "../../components/Discord/DiscordEmbed.vue";
export default {
	name: "HookBuilder",
	components: {
		// VueCodeHighlight,
		// DiscordEmbed,
	},
	data: () => {
		return {
			search: "",
			dialog: false,
			hookCommand: "",
			snackbar: false,
			npcs: [...NPC_LIST.map(e => new Npc(e))],
		};
	},
	computed: {
		filteredNpcs() {
			return this.npcs.filter(npc => {
				return npc.tags.some(t => t.toLowerCase().includes(this.search.toLowerCase()));
			});
		},
	},
};
</script>
