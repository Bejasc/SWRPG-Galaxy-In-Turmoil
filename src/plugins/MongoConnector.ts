import { JsonForms } from "@jsonforms/vue2";
import axios from "axios";

type allowedMongoCollections = "items" | "locations" | "skills" | "npcs";

export async function getFromMongo<T>(collection: allowedMongoCollections): Promise<T[]> {
	const corsBypass = "https://corsanywhere.herokuapp.com/";
	const mongoApiKey: string = process.env.VUE_APP_MONGO_API_KEY ?? "NOT PROVIDED";
	const mongoSource: string = process.env.VUE_APP_MONGO_SOURCE ?? "NOT PROVIDED";
	const mongoDatabase: string = process.env.VUE_APP_MONGO_DB ?? "NOT PROVIDED";

	const data = JSON.stringify({
		collection: collection,
		database: mongoDatabase,
		dataSource: mongoSource,
	});

	const response = await axios({
		method: "post",
		url: `${corsBypass}https://data.mongodb-api.com/app/data-ogatg/endpoint/data/beta/action/find`,
		headers: {
			// "Access-Control-Request-Headers": "*",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"api-key": mongoApiKey,
		},
		data: data,
	});

	const result: T[] = JSON.parse(JSON.stringify(response.data.documents));
	return result;
}

export async function pushToMongo<T>(collection: allowedMongoCollections, document: Document): Promise<T[]> {
	const corsBypass = "https://corsanywhere.herokuapp.com/";
	const mongoApiKey: string = process.env.VUE_APP_MONGO_API_KEY ?? "NOT PROVIDED";
	const mongoSource: string = process.env.VUE_APP_MONGO_SOURCE ?? "NOT PROVIDED";
	const mongoDatabase: string = process.env.VUE_APP_MONGO_DB ?? "NOT PROVIDED";

	const data = JSON.stringify({
		collection: collection,
		database: mongoDatabase,
		dataSource: mongoSource,
		document: document,
	});

	const response = await axios({
		method: "post",
		url: `${corsBypass}https://data.mongodb-api.com/app/data-ogatg/endpoint/data/beta/action/insertOne`,
		headers: {
			// "Access-Control-Request-Headers": "*",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"api-key": mongoApiKey,
		},
		data: data,
	});

	const result: T[] = response.data.documents;
	return result;
}
