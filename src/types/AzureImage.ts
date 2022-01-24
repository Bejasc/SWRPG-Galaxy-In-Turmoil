/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IAzureImage {
	id: number;
	name: string;
	url: string;
	tags?: string[];
	fileSize?: number;
	isChecked: boolean;
}
