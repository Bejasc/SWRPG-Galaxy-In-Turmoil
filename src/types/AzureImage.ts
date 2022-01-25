/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IAzureImage {
	id: number;
	name: string;
	url: string;
	tags: string[];
	fileSize?: number;
	isChecked: boolean;
}

export class AzureImage implements IAzureImage {
	id: number;
	name: string;
	url: string;
	tags: string[];
	fileSize: number;
	isChecked: boolean;

	constructor(img: IAzureImage) {
		this.id = img.id ?? -1;
		this.name = img.name ?? "New Image";
		this.url = img.url ?? "";
		this.tags = img.tags ?? [];
		this.fileSize = img.fileSize ?? -1;
		this.isChecked = img.isChecked ?? false;
	}

	get hasTags(): boolean {
		return this.tags.length > 0;
	}

	displayTags(): string {
		if (this.tags.length == 0) return "";
		else return this.tags.join(", ");
	}

	parseTags(input: string): string[] {
		return input.split(",");
	}

	parseTagsArray(): string {
		let tagString = "";

		this.tags.map(e => (tagString += e));

		return tagString.replace(" ", "");
	}
}
