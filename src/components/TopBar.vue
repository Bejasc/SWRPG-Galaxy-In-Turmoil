<template>
	<v-app-bar app permanent color="background">
		<v-toolbar-title>SWRPG - {{ $route.name }}</v-toolbar-title>
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

				<v-list-item v-for="item in items" :key="item.text" link active-class="big" @click="item.click()">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-title>{{ item.text }}</v-list-item-title>
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
import router from "@/router";
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
				{
					text: "Home",
					icon: "mdi-home",
					click: function() {
						router.push({ name: "Home" });
					},
				},
				{
					text: "Tools",
					icon: "mdi-hammer",
					click: function() {
						router.push({ name: "Tools" });
					},
				},
				{
					text: "Join",
					icon: "mdi-discord",
					click: function() {
						window.open("https://discord.gg/MU4XUVS", "_blank");
					},
				},
			],
		};
	},
};
</script>
