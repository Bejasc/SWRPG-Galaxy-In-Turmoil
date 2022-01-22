/* eslint-disable @typescript-eslint/interface-name-prefix */
import { generateRandomName, StarWarsNametype } from "@/plugins/StarWarsNameGen";
import { INpcCombatProperties } from "./Combat";
import { ALL_FACTIONS, IFaction, NpcAffiliation } from "./Faction";

export interface INpc {
	name: string;
	aliases?: string[];
	metaTags?: string[];
	avatar: string | undefined;
	namePreset?: StarWarsNametype;
	affiliation: NpcAffiliation;
	combatProperties?: INpcCombatProperties;
}

export function getFaction(search: string): IFaction {
	return ALL_FACTIONS.find(x => x.name.toLowerCase() == search.toLowerCase()) ?? ALL_FACTIONS[0];
}

export class Npc implements INpc {
	name: string;
	avatar: string | undefined;
	namePreset: StarWarsNametype;
	affiliation: NpcAffiliation;
	combatProperties?: INpcCombatProperties | undefined;

	aliases: string[];
	metaTags: string[];

	tags: string[] = [];
	faction: IFaction;

	constructor(npc: INpc) {
		this.name = npc.name ?? "Unknown";
		this.avatar = npc.avatar ?? "https://cdn.discordapp.com/attachments/864064937521184788/864476989196468264/badge_random.png";
		this.namePreset = npc.namePreset ?? StarWarsNametype.Male;
		this.affiliation = npc.affiliation ?? "Neutral";
		this.combatProperties = npc.combatProperties;

		this.aliases = npc.aliases ?? [];
		this.metaTags = npc.metaTags ?? [];

		this.faction = ALL_FACTIONS.find(x => x.name.toLowerCase() == this.affiliation.toLowerCase()) ?? ALL_FACTIONS[0];
		this.tags.push(...this.faction.aliases, ...this.aliases, ...[this.name], ...this.metaTags);
	}

	async getRandomName(): Promise<string> {
		const name = await generateRandomName(this.namePreset);
		console.log(name);
		return name;
	}

	get isCombatant(): boolean {
		return this.combatProperties !== undefined;
	}
}

export const NPC_LIST: INpc[] = [
	{
		name: "Storm Trooper",
		avatar: "https://cdn.discordapp.com/attachments/811812736764870678/917272707190652959/FB_IMG_1613449524637.jpg",
		namePreset: StarWarsNametype.TrooperTK,
		affiliation: "Empire",
	},
	{
		name: "Scout Trooper",
		avatar: "https://cdn.discordapp.com/attachments/811812736764870678/917272781786320968/FB_IMG_1613449505883.jpg",
		namePreset: StarWarsNametype.TrooperTK,
		affiliation: "Empire",
		metaTags: ["Endor"],
	},
	{
		name: "Snow Trooper",
		avatar: "https://cdn.discordapp.com/attachments/743332978893258763/934227519593402418/unknown.png",
		namePreset: StarWarsNametype.TrooperTK,
		affiliation: "Empire",
		metaTags: ["Hoth"],
	},
	{
		name: "Imperial Officer",
		avatar: "https://cdn.discordapp.com/attachments/811812736764870678/917273250231373834/FB_IMG_1614037607710.jpg",
		namePreset: StarWarsNametype.Male,
		affiliation: "Empire",
	},
	{
		name: "Rodian",
		avatar: "https://cdn.discordapp.com/attachments/743332978893258763/934277675550388334/unknown.png",
		namePreset: StarWarsNametype.Rodian,
		affiliation: "Neutral",
	},
	{
		name: "Twilek",
		avatar: "https://cdn.discordapp.com/attachments/743332978893258763/934278050567311380/unknown.png",
		namePreset: StarWarsNametype.Twilek,
		affiliation: "Neutral",
	},
];
