/* eslint-disable @typescript-eslint/interface-name-prefix */
interface IEmbedOptions {
	/**The Title of the Discord Embed */
	title: string;
	/**The Description shown in the Embed */
	description: string;
	/**URL to the image to be used. Best uploaded to the #📷assets-images channel */
	image?: string;
	thumbnail?: string;
	/**The colour that appears dow nthe side of the embed */
	color: string;
}

interface ILocationOptions {
	/**When set to Whitelist, Locations will *only* be selected from values. When set to Blacklist, any location in values will be ignored. */
	type: "Whitelist" | "Blacklist";
	/**List of Location names or IDs to use */
	values: string[];
}

type RequirementMatch = "One of" | "All of" | "None of";

export interface IEventLink {
	/**The text to be displayed as the Title of the Embed Field */
	optionText?: string;
	/**The reaction to be displayed as the option to select, as well as in the Embed Field */
	reaction?: string;
	/**A longer description of the action taken, shown as the content of the Embed Field */
	optionDescription?: string;
	/**The event that is presented when this option is selected. If more than one element exists, it will pick one at random */
	event: IEvent[];
}

export interface IRequirementDetail {
	/**How the requirements are matched.. Either `One of`, `All of`, or `None of` */
	match: RequirementMatch;
	/** The values to use for this requirement. Array of any of the types `string`, `IItemQuantity`, and `ISkillLevel`.
	 * Location and Race requirements proved as `string[]`, `IItemQuantity[]` for item requirements,
	 * and `ISkillLevel[]` for skill requirements */
	values: string[]; // | IItemQuantity[] | ISkillLevel[] | IAffinity[];
}

export interface IRequirement {
	/**How the requirements are matched.. Either `One of`, `All of`, or `None of` */
	match: RequirementMatch;
	/**Require certain race conditions for this event. */
	race?: IRequirementDetail;
	/**Require certain Item conditions for this event. Treated separately from Items removed via event results*/
	itemInInventory?: IRequirementDetail;
	/**Require certain Location conditions for this event. Treated separately from Event location whitelist/blacklist*/
	location?: IRequirementDetail;
	/**Require certain Skill conditions for this event. Can also be provided as Credits or Renown */
	skill?: IRequirementDetail;
	/**Require certain Faction Affinity for this event. */
	affinity?: IRequirementDetail;
	/**Require the character to be wearing or holding certain armor or weapons */
	itemEquipped?: IRequirementDetail;
}

interface IEventRequirement extends IRequirement {
	/**Require the character to win combat against an NPC. */
	combat?: IEventCombat;

	/**The event that is presented when the conditions faile. */
	failEvent: IEvent;
	onFail: string;
}

interface IEventCombat {
	npcId: string;
	playerEndAtHp?: number;
	npcEndAtHp?: number;
	forceWeapon?: string;
	fleeEvent?: IEvent;
}

export interface IEvent {
	embedOptions: IEmbedOptions;
	locationOptions?: ILocationOptions;
	eventLinks?: IEventLink[];
	requirements?: IEventRequirement;
	results?: string[]; //(IItemQuantity | ISkillLevel | IAffinity | ILocationControlPoints)[];
}

export class SwrpgEvent implements IEvent {
	embedOptions: IEmbedOptions;
	eventLinks: IEventLink[];

	locationOptions?: ILocationOptions;
	requirements?: IEventRequirement;
	results?: string[];

	constructor(event?: IEvent) {
		this.embedOptions = event?.embedOptions ?? {
			title: "New Event",
			description: "",
			color: "#E6A00E",
		};
		this.locationOptions = event?.locationOptions ?? undefined;
		this.eventLinks = event?.eventLinks ?? [];
		this.requirements = event?.requirements ?? undefined;
		this.results = event?.results ?? undefined;
	}
}
