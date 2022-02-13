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
		avatars: [],
	},
	{
		name: "Human Female",
		nameType: StarWarsNametype.Female,
		description: "A Human Female.",
		baseArmorClass: 7,
		avatars: [],
	},
	{
		name: "Rodian",
		nameType: StarWarsNametype.Rodian,
		description: "A Rodian Citizen",
		baseArmorClass: 7,
		avatars: [],
	},
	{
		name: "Twilek",
		nameType: StarWarsNametype.Twilek,
		description: "A Twilek Citizen",
		baseArmorClass: 9,
		avatars: [],
	},
	{
		name: "Duros",
		nameType: StarWarsNametype.Duros,
		description: "A Duros Citizen.",
		baseArmorClass: 8,
		avatars: [],
	},
	{
		name: "Trandoshan",
		nameType: StarWarsNametype.Trandoshan,
		description: "A Trandoshan Citizen.",
		baseArmorClass: 10,
		avatars: [],
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
		],
	},
];
