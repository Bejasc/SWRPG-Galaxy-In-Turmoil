/* eslint-disable @typescript-eslint/interface-name-prefix */

import mongoose, { Document, Schema } from "mongoose";

export type WeaponType = "Melee" | "Pistol" | "Rifle";
export type WeaponRange = "Melee" | "Short" | "Medium" | "Long";
export type DamageType = "Ion" | "Energy" | "Fire" | "Kinetic";
export type DamageResistance = { type: DamageType; amount: number };
export type WeaponStats = {
	weaponType: WeaponType;
	maxHits: number;
	damage: { min: number; max: number };
	damageType: DamageType;
	range: WeaponRange;
};

export type ArmorStats = {
	armorValue: number;
	damageResistance?: DamageResistance[];
	encumbranceModifier: number;
};

export interface IItem extends Document {
	name: string;
	aliases?: string[];
	image?: string;
	category: string;
	description?: string;
	manufacturer?: string;
	encumbrance?: number;
	baseValue: number;
	weaponStats?: WeaponStats;
	armorStats?: ArmorStats;
}

const ItemSchema: Schema = new Schema(
	{
		_id: String,
		name: String,
		aliases: [String],
		image: String,
		description: String,
		manufacturer: String,
		category: String,
		encumbrance: Number,
		baseValue: Number,
		weaponStats: {},
		armorStats: {},
		consumableStats: {},
		tradeInfo: {
			tradeable: {
				type: Boolean,
				default: true,
			},
			buyOptions: {},
			sellOptions: {},
		},
	},
	{ collation: { locale: "en", strength: 2 } },
);

export const Item = mongoose.model<IItem>("item", ItemSchema);
