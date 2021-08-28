export interface ItemInterface {
	name: string;
	image: string;
	description: string;
}

export class Item implements ItemInterface {
	name: string;
	image: string;
	description: string;

	constructor() {
		this.name = "";
		this.image = "";
		this.description = "";
	}
}
