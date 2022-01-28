/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
	name: string;
	description: string;
	image?: string;
	emoji?: string;
}

export const SkillSchema: Schema = new Schema(
	{
		name: String,
		description: String,
		image: String,
		emoji: String,
	},
	{ collation: { locale: "en", strength: 2 } },
);

export const Skill = mongoose.model<ISkill>("Stats", SkillSchema);

export interface ISkillLevel {
	skillName: string;
	skill?: ISkill;
	level?: number;
	experience?: number;
}
