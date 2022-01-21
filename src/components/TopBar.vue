<template>
	<v-app-bar app permanent color="background">
		<v-spacer />
		<!-- <v-btn outlined>View docs</v-btn> -->
		<v-menu left bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-menu</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-subheader>Menu</v-subheader>

				<v-list-item link @click="$router.push({ path: '/' })">
					<v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>
					<v-list-item-title>Home </v-list-item-title>
				</v-list-item>

				<v-list-item link @click="$router.push({ path: 'tools' })">
					<v-list-item-icon> <v-icon>mdi-hammer</v-icon> </v-list-item-icon><v-list-item-title>Tools </v-list-item-title>
				</v-list-item>

				<v-list-item link @click="navigate('https://discord.gg/MU4XUVS')">
					<v-list-item-icon>
						<v-icon>mdi-discord</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Join </v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<style lang="scss">
.container {
	max-width: 100vw;
	padding: 0px;
}
</style>

<script lang="ts">
export default {
	name: "TopBar",
	methods: {
		navigate: function(target: string) {
			window.open(target, "_blank");
		},
	},
	data() {
		return {
			items: [
				{ text: "Quest Item Creator", icon: "mdi-map-marker-question", click: "" },
				{ text: "NPC Creator", icon: "mdi-account", click: "" },
				{ text: "Hook Builder", icon: "mdi-hook", click: "" },
			],
		};
	},
};
</script>
