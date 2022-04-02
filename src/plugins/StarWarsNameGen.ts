import axios from "axios";

export type StarWarsNametype = "Male" | "Female" | "Twilek" | "Rodian" | "Trandoshan" | "Wookiee" | "Droid" | "Hutt" | "Duros" | "TrooperTK";

export async function generateRandomName(type: StarWarsNametype, num = 1, includeLastName = true): Promise<string> {
	const swrpgApi: string = process.env.VUE_APP_SWRPG_API ?? "NOT PROVIDED";

	const url = swrpgApi + `namegen?nameType=${type}`;

	const response = await axios({
		method: "get",
		url,
		headers: {
			"Content-Type": "application/text",
		},
	});

	return response.data;
}
