<template>
	<v-navigation-drawer absolute dark width="300" permanent>
		<v-img src="@/assets/hoth.png"> </v-img>
		<v-list>
			<v-list-group color="white" :value="true" prepend-icon="mdi-dice-d20">
				<template v-slot:activator>
					<v-list-item-title>GM Tools</v-list-item-title>
				</template>

				<v-list-item v-for="item in items" class="ml-15" :key="item.text" link active-class="big" @click="item.click()">
					<!-- <v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon> -->

					<v-list-item-title>{{ item.text }}</v-list-item-title>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import router from "@/router";
export default {
	data() {
		return {
			items: [
				// { text: "Quest Item Creator", icon: "mdi-map-marker-question" },
				{
					text: "NPC Creator",
					icon: "mdi-account",
					click: function() {
						router.push({ path: "/tools/npc" });
					},
				},
				{
					text: "Hook Builder",
					icon: "mdi-hook",
					click: function() {
						router.push({ path: "/tools/hook" });
					},
				},
			],
		};
	},
};
</script>
