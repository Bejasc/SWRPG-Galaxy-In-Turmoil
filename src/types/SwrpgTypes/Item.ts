/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
	_id: string;
	name: string;
	aliases?: string[];
	category: string;
	description: string;
	image?: string;
	encumbrance?: number;
}

export const ItemSchema: Schema = new Schema(
	{
		_id: String,
		name: String,
		aliases: [String],
		category: String,
		description: String,
		image: String,
		encumbrance: Number,
	},
	{ collation: { locale: "en", strength: 2 } },
);

export const Item = mongoose.model<IItem>("item", ItemSchema);
