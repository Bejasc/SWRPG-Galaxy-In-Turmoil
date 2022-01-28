/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
	_id: string;
	name: string;
	description: string;
	image?: string;
	encumbrance?: number;
}

export const ItemSchema: Schema = new Schema(
	{
		name: String,
		description: String,
		image: String,
		emoji: String,
	},
	{ collation: { locale: "en", strength: 2 } },
);

export const Item = mongoose.model<IItem>("item", ItemSchema);
