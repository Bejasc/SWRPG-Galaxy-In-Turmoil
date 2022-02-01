/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
	_id: string;
	name: string;
	aliases: string[];
	category: string;
	description: string;
	image?: string;
	encumbrance?: number;
}

export const ItemSchema: Schema = new Schema(
	{
		name: String,
		description: String,
		category: String,
		image: String,
		emoji: String,
	},
	{ collation: { locale: "en", strength: 2 } },
);

ItemSchema.methods.isVerified = function(): boolean {
	//TODO determine this in a more meaningful way
	return true;
};

export const Item = mongoose.model<IItem>("item", ItemSchema);
