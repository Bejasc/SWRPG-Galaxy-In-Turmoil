// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IFaction {
	name: string;
	aliases: string[];
	color: string;
}

export type NpcAffiliation = "Neutral" | "Empire";
export const ALL_FACTIONS: IFaction[] = [
	{
		name: "Neutral",
		color: "#626262",
		aliases: ["independent", "independant", "unafilliated", "not affiliated", "none", "solo", "neutral"],
	},
	{
		name: "Empire",
		color: "#0e3553 ",
		aliases: ["imperial", "empire", "imp", "emp", "galacitc empire"],
	},
];
