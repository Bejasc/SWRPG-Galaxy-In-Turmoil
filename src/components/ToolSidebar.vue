<template>
	<v-row fill-height wrap>
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

					<v-list-group color="white" :value="true" prepend-icon="mdi-book-open-page-variant">
						<template v-slot:activator>
							<v-list-item-title>Datasets</v-list-item-title>
						</template>

						<v-list-item v-for="item in datasets" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item>
					</v-list-group>

					<!-- <v-list-group color="white" :value="true" prepend-icon="mdi-star-shooting">
						<template v-slot:activator>
							<v-list-item-title>Contributor Tools</v-list-item-title>
						</template>

						<v-list-item v-for="item in contributorResources" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item>
					</v-list-group> -->

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
		<v-snackbar v-model="snackbar" timeout="4000">This option is tempoarily disabled</v-snackbar>
	</v-row>
</template>

<script>
import router from "@/router";
export default {
	data: () => {
		return {
			snackbar: false,
			snackbarMessage: "Tempoarily Disabled",
			datasets: [
				{
					text: "Items",
					click: function() {
						router.push({ path: "/data/items" });
					},
				},
				{
					text: "NPCs",
					click: function() {
						router.push({ path: "/data/npc" });
					},
				},
			],
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
				// {
				// 	text: "NPC Directory",
				// 	icon: "mdi-account",
				// 	click: function() {
				// 		router.push({ path: "/tools/npc" });
				// 	},
				// },
				{
					text: "Image Library",
					icon: "mdi-image",
					click: function() {
						alert("This item is tempoarily disabled");
						//router.push({ path: "/tools/images" });
					},
				},
			],
			contributorResources: [
				{
					text: "Event Builder",
					click: function() {
						router.push({ path: "/tools/eventBuilder" });
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
						//router.push({ path: "/tools/resources/images" });
					},
				},
			],
		};
	},
};
</script>
