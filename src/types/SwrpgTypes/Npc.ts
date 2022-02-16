/* eslint-disable @typescript-eslint/interface-name-prefix */
// import { DamageResistance, DamageType, WeaponRange, WeaponType } from "./Item";
import { StarWarsNametype } from "@/plugins/StarWarsNameGen";
import mongoose, { Document, Schema } from "mongoose";

export interface INpc extends Document {
	_id: string;
	name: string;
	aliases?: string[];
	avatar?: string;
	quotes?: [];
	description?: string;
	verified: boolean;
	combatProperties?: {
		hitpoints: number;
		armorClass: number;
		weaponType: string;
		weaponSkill: number;
		// requiredRange: WeaponRange;
		hits: number;
		// damageType: DamageType;
		// damageResistance?: DamageResistance[];
		damage: {
			min: number;
			max: number;
		};
		attackDescriptions: string[];
	};
}

export const NpcSchema: Schema = new Schema(
	{
		_id: String,
		name: String,
		avatar: String,
		aliases: [String],
		quotes: [],
		description: String,
		verified: { type: Boolean, default: false },
		combatProperties: {
			hitpoints: { type: Number, default: 30 },
			armorClass: { type: Number, default: 7 },
			weaponType: { type: String, default: "Melee" },
			weaponSkill: { type: Number, default: 1 },
			requiredRange: String,
			hits: { type: Number, default: 1 },
			damageType: { type: String, default: "Kinetic" },
			damage: {
				min: { type: Number, default: 2 },
				max: { type: Number, default: 6 },
			},
			damageResistance: Object,
			attackDescriptions: [String],
		},
	},
	{ collation: { locale: "en", strength: 2 } },
);

export const Npc = mongoose.model<INpc>("npc", NpcSchema);

//-----------------------

export interface INpcTemplate {
	name: string;
	namePrefix?: string;
	nameType: StarWarsNametype;
	description: string;
	baseArmorClass: number;
	avatars: string[];
}

export const NpcTemplates: INpcTemplate[] = [
	{
		name: "Human Male",
		nameType: StarWarsNametype.Male,
		description: "A Human Male.",
		baseArmorClass: 8,
		avatars: [
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/358.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/352.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/353.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/318.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/306.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/315.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/297.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/299.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/300.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/336.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/328.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/279.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/263.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/243.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/238.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/218.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/207.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/199.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/201.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/198.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/168.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/158.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/132.png",
		],
	},
	{
		name: "Human Female",
		nameType: StarWarsNametype.Female,
		description: "A Human Female.",
		baseArmorClass: 7,
		avatars: [
			"http://kndr.io/ts/swt1/i/HumanFemale_5.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_14.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_13.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_12.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_8.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_7.png",
			"http://kndr.io/ts/swt1/i/HumanFemale_6.png",
			"http://kndr.io/ts/swt1/i/HumanFemale.png",
			"http://kndr.io/ts/swt1/i/HumanWomanTribalCivilian.png",
			"http://kndr.io/ts/swt1/i/HumanWomanSmugglerOrpaVio.png",
			"http://kndr.io/ts/swt1/i/HumanWomanArmorCommando.png",
			"http://kndr.io/ts/swt1/i/HumanWomanArmorCrazy.png",
			"http://kndr.io/ts/swt1/i/HumanWomanBlasterDrawn.png",
		],
	},
	{
		name: "Rodian",
		nameType: StarWarsNametype.Rodian,
		description: "A Rodian Citizen",
		baseArmorClass: 7,
		avatars: [
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_621.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_613.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_620.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_624.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_585.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_604.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_597.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_577.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_569.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_559.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_542.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_547.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_541.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_540.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_534.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_533.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Rodians/token_528.png",
			"",
		],
	},
	{
		name: "Twilek",
		nameType: StarWarsNametype.Twilek,
		description: "A Twilek Citizen",
		baseArmorClass: 9,
		avatars: [
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1105.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1100.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1099.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1096.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1089.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1085.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1087.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1076.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1073.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1066.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1065.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1059.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1057.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1049.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1046.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1038.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1032.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1028.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1026.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1025.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1024.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1022.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1021.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1020.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1019.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1017.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_992.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_993.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_994.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_995.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_968.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_970.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_948.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_938.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_937.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_1106.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Twilek/token_930.png",
		],
	},
	{
		name: "Duros",
		nameType: StarWarsNametype.Duros,
		description: "A Duros Citizen.",
		baseArmorClass: 8,
		avatars: [
			"http://kndr.io/ts/swt1/i/DurosMaleSpacesuit.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041204944240660/duros1.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041215518101524/duros2.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041230546296832/duros3.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041240130256937/duros4.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041248237854730/duros5.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041259994488842/duros6.png",
			"https://cdn.discordapp.com/attachments/811812736764870678/943041271159726100/duros7.png",
		],
	},
	{
		name: "Trandoshan",
		nameType: StarWarsNametype.Trandoshan,
		description: "A Trandoshan Citizen.",
		baseArmorClass: 10,
		avatars: [
			"http://kndr.io/ts/swt1/i/TrandoshanMale_15.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_14.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_12.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_13.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_2.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_3.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_4.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_6.png",
			"http://kndr.io/ts/swt1/i/TrandoshanMale_10.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Misc/220.png",
		],
	},
	{
		name: "Imperial Soldier",
		namePrefix: "Trooper",
		nameType: StarWarsNametype.TrooperTK,
		description: "A Storm Trooper.",
		baseArmorClass: 12,
		avatars: [
			"http://kndr.io/ts/swt1/i/StormtrooperMale_8.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_9.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_11.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_17.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_4.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_2.png",
			"http://kndr.io/ts/swt1/i/StormtrooperMale_6.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_516.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_509.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_503.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_511.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_514.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_512.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_515.png",
			"http://www.thruxus.shadows-angels.com/StarwarsTokens/Other/token_516.png",
		],
	},
];
