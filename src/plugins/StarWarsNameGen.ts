import axios from "axios";

export type StarWarsNametype = "Male" | "Female" | "Twilek" | "Rodian" | "Trandoshan" | "Wookiee" | "Droid" | "Hutt" | "Duros" | "TrooperTK";

function padLeadingZeros(num: string, size: number): string {
	let s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}

export function getRandomTrooperDesignation(type: StarWarsNametype): string {
	const rnum = Math.floor(Math.random() * 9999);
	const id = padLeadingZeros(rnum.toString(), 4);

	return `${type}-${id}`;
}

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
