/* eslint-disable @typescript-eslint/interface-name-prefix */
// import { DamageResistance, DamageType, WeaponRange, WeaponType } from "./Item";
import mongoose, { Document, Schema } from "mongoose";

export interface INpc extends Document {
	id?: string;
	name: string;
	aliases?: string[];
	avatar?: string;
	quotes?: [];
	description?: string;
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
		name: String,
		avatar: String,
		aliases: [String],

		quotes: [],
		description: String,
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
