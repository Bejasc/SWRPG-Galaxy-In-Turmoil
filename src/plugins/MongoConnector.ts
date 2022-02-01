import axios from "axios";

type allowedMongoCollections = "items" | "locations" | "skills";

export async function getFromMongo<T>(collection: allowedMongoCollections): Promise<T[]> {
	const corsBypass = "https://corsanywhere.herokuapp.com/";

	const data = JSON.stringify({
		collection: collection,
		database: "swrpg-test",
		dataSource: "discord-swrpg",
	});

	const mongoApiKey: string = process.env.VUE_APP_MONGO_API_KEY ?? "NOT PROVIDED";
	console.log(mongoApiKey);

	const response = await axios({
		method: "post",
		url: `${corsBypass}https://data.mongodb-api.com/app/data-ogatg/endpoint/data/beta/action/find`,
		headers: {
			"Access-Control-Request-Headers": "*",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"api-key": mongoApiKey,
		},
		data: data,
	});

	const result: T[] = JSON.parse(JSON.stringify(response.data.documents));
	console.log(result);
	return result;
}
