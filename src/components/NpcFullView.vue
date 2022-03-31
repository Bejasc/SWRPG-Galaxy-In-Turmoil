<template>
	<v-row justify="center">
		<v-dialog v-model="show" max-width="800px">
			<v-card>
				<v-card-title>
					<span class="text-h5">NPC</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row dense v-if="allowEdit && !item.verified">
							<v-col cols="10">
								<v-select
									label="Create from Template"
									clearable
									outlined
									dense
									return-object
									:items="templateNpcs"
									item-text="name"
									v-model="selectedTemplate"
								></v-select>
							</v-col>
							<v-col cols="2">
								<v-btn :disabled="!selectedTemplate" @click="generateNpc">Generate</v-btn>
							</v-col>
						</v-row>
						<v-divider></v-divider>

						<v-row class="pt-4">
							<v-expansion-panels accordion>
								<v-expansion-panel>
									<v-expansion-panel-header color="grey darken-3">General Properties</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-col sm="8">
											<v-col sm="8">
												<v-text-field v-model="item.name" v-if="allowEdit" label="Name*" outlined dense required></v-text-field>
												<v-text-field v-else label="Name*" readonly outlined dense :value="item.name"></v-text-field>
											</v-col>

											<v-col sm="12">
												<v-textarea v-model="item.description" v-if="allowEdit" label="Description" dense required outlined rows="3"></v-textarea>
												<v-textarea v-else label="Description*" readonly dense outlined required :value="item.description" rows="3"></v-textarea>
											</v-col>
										</v-col>
										<v-col sm="4">
											<img :src="item.avatar" v-if="item.avatar" class="itemThumbnail" @click="changeItemImage()" />
											<img
												v-else
												src="https://cdn.discordapp.com/attachments/864064937521184788/864476989196468264/badge_random.png"
												alt=""
												class="itemThumbnail"
												@click="changeItemImage()"
											/>
										</v-col>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-row>

						<v-row v-if="item.combatProperties">
							<v-expansion-panels accordion>
								<v-expansion-panel>
									<v-expansion-panel-header color="red darken-4">Combat Properties</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-col sm="6">
											Weapon Type
											<v-select :items="weaponTypes" :disabled="!allowEdit" v-model="item.combatProperties.weaponType"></v-select>
										</v-col>
										<v-col sm="6">
											Hitpoints
											<v-text-field type="number" :disabled="!allowEdit" v-model="item.combatProperties.hitpoints"></v-text-field>
										</v-col>
										<v-col sm="12">
											Weapon Skill
											<v-slider
												:readonly="!allowEdit"
												v-model="item.combatProperties.weaponSkill"
												:tick-labels="weaponSkillLabels"
												color="yellow darken-4"
												min="1"
												max="10"
												ticks="always"
												tick-size="8"
												thumb-label="always"
											>
											</v-slider>
										</v-col>
										<v-col sm="12">
											Armor Class
											<v-slider
												:readonly="!allowEdit"
												v-model="item.combatProperties.armorClass"
												:tick-labels="armorClassLabels"
												min="4"
												max="20"
												ticks="always"
												tick-size="8"
												thumb-label="always"
											>
											</v-slider>
										</v-col>
										<v-col sm="6">
											Damage
											<v-range-slider class="pt-3" :readonly="!allowEdit" @change="changeDamageSlider($event)" min="1" max="20" color="red" thumb-label>
											</v-range-slider>
										</v-col>
										<v-col sm="3">
											Hits
											<v-slider class="pt-3" :readonly="!allowEdit" v-model="item.combatProperties.hits" min="1" max="5" color="red" thumb-label> </v-slider>
										</v-col>
										<v-col sm="3">
											Damage Type
											<v-select dense :items="damageTypes" :disabled="!allowEdit" v-model="item.combatProperties.damageType"></v-select>
										</v-col>
										<v-col sm="3">
											<small>Maximum Damage Output: {{ maxDamageOutput() }}</small>
										</v-col>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-row>
					</v-container>
					<!-- <small>*indicates required field</small> -->
				</v-card-text>
				<v-card-actions>
					<small style="opacity:0.2">NPC ID: {{ item._id }}</small>

					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="$emit('closeFullView')">
						Close
					</v-btn>

					<v-tooltip top v-if="allowEdit">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="yellow darken-1" :disabled="!item.name" text @click="copyOneShot()" v-bind="attrs" v-on="on">
								Copy One-shot
							</v-btn>
						</template>
						<span style="text-align:center"
							>Copy One-shot command to Clipboard. Add your message in Discord.<br />A 'One-Shot' NPC is not saved in the database, but can speak like the regular NPC
							command.</span
						>
					</v-tooltip>
					<v-btn v-if="allowEdit" color="green darken-1" disabled text @click="saveNewItem()">
						<!-- <v-btn v-if="allowEdit" color="green darken-1"  :disabled="!item.name" text @click="saveNewItem()"> -->
						Save NPC
					</v-btn>
					<!-- <v-btn color="blue darken-1" text @click="show = false">
						Save
					</v-btn> -->
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="snackbar" timeout="4000">One-Shot Command copied to clipboard for {{ item.name }}</v-snackbar>
	</v-row>
</template>

<style>
.itemThumbnail {
	object-fit: contain;
	max-width: 220px;
	max-height: 220px;
	object-position: center;
	margin: 0 auto;
}
</style>

<script lang="ts">
import { pushToMongo } from "@/plugins/MongoConnector";
import { generateRandomName } from "@/plugins/StarWarsNameGen";
import { INpc, INpcTemplate, Npc, NpcTemplates } from "@/types/SwrpgTypes/Npc";
import Vue from "vue";
export default Vue.extend({
	props: {
		show: Boolean,
		item: Npc,
		allowEdit: Boolean,
	},
	data: () => {
		return {
			aliasString: "",
			templateNpcs: NpcTemplates,
			selectedTemplate: null,
			snackbar: false,
			weaponSkillLabels: ["", "Unskilled", "", "Novice", "", "Skilled", "", "Master", "", "Legend"],
			armorClassLabels: ["", "", "Easy", "", "", "", "Medium", "", "", "", "Hard", "", "", "Very Hard", "", "", "Legend"],
			weaponTypes: ["Pistol", "Rifle", "Melee"],
			damageTypes: ["Ion", "Energy", "Fire", "Kinetic"],
		};
	},
	methods: {
		changeDamageSlider(val) {
			this.item.combatProperties.damage.min = val[0];
			this.item.combatProperties.damage.max = val[1];
		},
		maxDamageOutput() {
			return this.item.combatProperties.hits * this.item.combatProperties?.damage.max;
		},
		async saveNewItem() {
			this.$parent.showLoader = true;

			this.item.verified = false;
			await pushToMongo<INpc>("npcs", this.item, true);

			this.$emit("itemAdded", this.item);
			this.$parent.showLoader = false;
		},
		changeItemImage() {
			const imageUrl = prompt("Enter the URL for the new image", this.item.avatar);
			if (imageUrl != null) this.item.avatar = imageUrl;
		},
		async generateNpc() {
			//this.item.name = getRandomTrooperDesignation(StarWarsNametype.TrooperTK);
			this.$parent.showLoader = true;

			const name = await generateRandomName(this.selectedTemplate.nameType);
			this.item.name = name;

			this.item.description = this.selectedTemplate.description;

			if (this.selectedTemplate.avatars?.length > 0) {
				const randomImage = this.selectedTemplate.avatars[Math.floor(Math.random() * this.selectedTemplate.avatars.length)];
				this.item.avatar = randomImage;
			}

			this.$parent.showLoader = false;
		},
		copyOneShot() {
			this.snackbar = true;
			navigator.clipboard.writeText(
				`^!os "${this.item.name}" "${this.item.avatar ?? "https://cdn.discordapp.com/attachments/864064937521184788/864476989196468264/badge_random.png"}"\n`,
			);
			this.$emit("closeFullView");
		},
	},
	mounted() {
		console.log(this.templateNpcs);
	},
});
</script>
