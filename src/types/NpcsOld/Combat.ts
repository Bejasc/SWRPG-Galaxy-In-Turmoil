type WeaponType = "Melee" | "Pistol" | "Rifle";
type WeaponRange = "Melee" | "Short" | "Medium" | "Long";
type DamageType = "Ion" | "Energy" | "Fire" | "Kinetic";
type DamageResistance = { type: DamageType; amount: number };

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface INpcCombatProperties {
	hitpoints: number;
	armorClass: number;
	weaponType: WeaponType;
	weaponSkill: number;
	hits: number;
	damageType: DamageType;
	damageResistance?: DamageResistance[];
	damage: {
		min: number;
		max: number;
	};
}
