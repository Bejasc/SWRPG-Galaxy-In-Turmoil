<template>
	<v-navigation-drawer absolute dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" width="250" permanent>
		<v-list nav flat>
			<v-list-group color="white" :value="true" prepend-icon="mdi-dice-d20">
				<template v-slot:activator>
					<v-list-item-title>GM Tools</v-list-item-title>
				</template>

				<v-list-item v-for="item in items" :key="item.text" link active-class="big">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-title>{{ item.text }}</v-list-item-title>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ text: "Quest Item Creator", icon: "mdi-map-marker-question" },
				{ text: "NPC Creator", icon: "mdi-account" },
				{ text: "Hook Builder", icon: "mdi-hook" },
			],
		};
	},
};
</script>
