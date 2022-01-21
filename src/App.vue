<template>
	<v-app>
		<TopBar />

		<router-view />

		<v-footer color="secondary">
			<v-layout row wrap align-center>
				<v-flex xs12>
					<div class="white--text ml-4">
						SWRPG: Galaxy in Turmoil - by Bejasc
					</div>
				</v-flex>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<style lang="scss">
.container {
	max-width: 100vw;
	padding: 0px;
}
</style>

<script lang="ts">
import Vue from "vue";
import TopBar from "./components/TopBar.vue";
export default Vue.extend({
	name: "App",
	components: { TopBar },
	methods: {
		navigate: function(target: string) {
			window.open(target, "_blank");
		},
	},
	data: () => ({}),
	computed: {
		theme() {
			return this.$vuetify.theme.dark ? "dark" : "light";
		},
	},
});
</script>
