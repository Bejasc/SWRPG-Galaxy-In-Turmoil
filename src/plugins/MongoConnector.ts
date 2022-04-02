import { Document } from "mongoose";
import axios from "axios";
import { EJSON } from "bson";

type allowedMongoCollections = "items" | "locations" | "skills" | "npcs";

export async function getData<T>(collection: allowedMongoCollections, id?: string): Promise<T[]> {
	const swrpgApi: string = process.env.VUE_APP_SWRPG_API ?? "NOT PROVIDED";

	let url = swrpgApi + collection;

	//if ID provided, add to the request
	if (id) url += `/${id}`;

	const response = await axios({
		method: "get",
		url,
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result: T[] = JSON.parse(JSON.stringify(response.data));
	return result;
}

export async function postData<T>(collection: allowedMongoCollections, item: T): Promise<T | null> {
	const swrpgApi: string = process.env.VUE_APP_SWRPG_API ?? "NOT PROVIDED";

	const url = swrpgApi + collection;

	const body = JSON.stringify(item);
	console.log(body);
	const response = await axios({
		method: "post",
		url,
		headers: {
			"Content-Type": "application/json",
		},
		data: body,
	});

	console.log(response.status);

	if (response.status === 200) {
		const result: T = JSON.parse(JSON.stringify(response.data));
		return result;
	} else {
		//TODO handle ot her response types
		return null;
	}
}

export async function getFromMongo<T>(collection: allowedMongoCollections): Promise<T[]> {
	console.error("DEPRECATED");
	return [];
}

export async function pushToMongo<T>(collection: allowedMongoCollections, document: Document, convertObjectId: boolean): Promise<T[]> {
	console.error("DEPRECATED");
	return [];
	/*
	const corsBypass = CORS_BYPASS;
	const mongoApiKey: string = process.env.VUE_APP_MONGO_API_KEY ?? "NOT PROVIDED";
	const mongoSource: string = process.env.VUE_APP_MONGO_SOURCE ?? "NOT PROVIDED";
	const mongoDatabase: string = process.env.VUE_APP_MONGO_DB ?? "NOT PROVIDED";

	const data = convertObjectId
		? EJSON.stringify({
				collection: collection,
				database: mongoDatabase,
				dataSource: mongoSource,
				document: document,
		  })
		: JSON.stringify({
				collection: collection,
				database: mongoDatabase,
				dataSource: mongoSource,
				document: document,
		  });

	const body = JSON.parse(data);

	if (convertObjectId) {
		const idObj = { $oid: document._id };
		body.document._id = idObj;
	}

	const response = await axios({
		method: "post",
		url: `${corsBypass}https://data.mongodb-api.com/app/data-ogatg/endpoint/data/beta/action/insertOne`,
		headers: {
			// "Access-Control-Request-Headers": "*",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"api-key": mongoApiKey,
		},
		data: convertObjectId ? EJSON.stringify(body) : JSON.stringify(body),
	});

	const result: T[] = response.data.documents;
	return result;
	*/
}
