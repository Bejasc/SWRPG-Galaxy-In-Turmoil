// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IHook {
	title: string;
	thumbnail: string | undefined;
	image: string | undefined;
	description: string;
}

export class Hook implements IHook {
	title: string;
	thumbnail: string | undefined;
	image: string | undefined;
	description: string;

	constructor() {
		this.title = "";
		this.thumbnail = undefined;
		this.image = undefined;
		this.description = "";
	}

	toCommand(): string {
		return `^!hook "${this.title}" 
"
${this.description}	
"
${this.image ? `img:"${this.image}"` : ""}
${this.thumbnail ? `avatar:"${this.thumbnail}"` : ""}
`;
	}
}
