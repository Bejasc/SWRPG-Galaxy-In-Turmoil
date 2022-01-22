import axios from "axios";

export enum StarWarsNametype {
	Male = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Star Wars Male",
	Female = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Star Wars Female",
	Twilek = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Twilek",
	Rodian = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Rodian",
	Trandoshan = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Trandoshan",
	Wookiee = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Wookiee",
	Droid = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Droid",
	Hutt = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Hutt",
	Duros = "https://donjon.bin.sh/name/rpc-name.fcgi?type=Duros",
	TrooperTK = "TK",
}

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
	if (type === StarWarsNametype.TrooperTK) return getRandomTrooperDesignation(type);

	const corsBypass = "https://corsanywhere.herokuapp.com/";

	const url = `${corsBypass}${type}&n=${num}`;

	const x = await axios({
		method: "GET",
		url,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});

	let name = await x.data;

	if (type === StarWarsNametype.Twilek) {
		//Twileks only have a 1 part name, so generate a random male name and take the surname
		const extraName = await generateRandomName(StarWarsNametype.Male);
		name += " " + extraName.split(" ")[1];
	}

	return name;
}
