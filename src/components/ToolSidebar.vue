<template>
	<v-row fill-height>
		<v-col cols="2" class="ma-0 pa-0">
			<v-navigation-drawer absolute dark width="300" permanent>
				<v-img src="@/assets/hoth.png"> </v-img>
				<v-list>
					<!-- <v-list-item link active-class="big" @click="$router.push('/tools')">
						<v-list-item-icon>
							<v-icon>mdi-information</v-icon>
						</v-list-item-icon>
						<v-list-item-title>About</v-list-item-title>
					</v-list-item> -->

					<v-list-group color="white" :value="true" prepend-icon="mdi-dice-d20">
						<template v-slot:activator>
							<v-list-item-title>Tools</v-list-item-title>
						</template>

						<v-list-item v-for="item in gmTools" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item>
					</v-list-group>

					<!-- <v-list-group color="white" :value="false" prepend-icon="mdi-package-variant" disabled>
						<template v-slot:activator>
							<v-list-item-title>Resources</v-list-item-title>
						</template>

						<v-list-item v-for="item in gmResources" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item>
					</v-list-group> -->

					<!-- <v-list-group color="white" :value="false" prepend-icon="mdi-console" disabled>
						<template v-slot:activator>
							<v-list-item-title>Commands</v-list-item-title>
						</template>

						<v-list-item v-for="item in gmCommands" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item>
					</v-list-group> -->
				</v-list>
			</v-navigation-drawer>
		</v-col>
	</v-row>
</template>

<script>
import router from "@/router";
export default {
	data() {
		return {
			gmTools: [
				{
					text: "Hook Builder",
					icon: "mdi-hook",
					click: function() {
						router.push({ path: "/tools/hook" });
					},
				},
				// {
				// 	text: "Quest Item Creator",
				// 	icon: "mdi-map-marker-question",
				// 	click: function() {
				// 		router.push({ path: "/tools/item" });
				// 	},
				// },
				{
					text: "NPC Directory",
					icon: "mdi-account",
					click: function() {
						router.push({ path: "/tools/npc" });
					},
				},
			],
			gmResources: [
				// { text: "Quest Item Creator", icon: "mdi-map-marker-question" },
				{
					text: "Difficulty Checks",
					click: function() {
						router.push({ path: "/tools/resources/difficultyChecks" });
					},
				},
				{
					text: "Event Images",
					click: function() {
						router.push({ path: "/tools/resources/images" });
					},
				},
				{
					text: "NPC Tokens",
					click: function() {
						router.push({ path: "/tools/resources/npcTokens" });
					},
				},
			],
		};
	},
};
</script>
