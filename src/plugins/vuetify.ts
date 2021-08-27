import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";
import Router from "vue-router";

Vue.use(Vuetify);
Vue.use(Router);
export default new Vuetify({
	theme: {
		options: {
			customProperties: true,
		},
		dark: true,
		themes: {
			dark: {
				primary: "#7289DA",
				secondary: "#4E5D94",
				accent: "#FFFFFF",
				background: "#23272A",
			},
			light: {
				primary: "#7289DA",
				secondary: "#4E5D94",
				accent: "#23272A",
				background: "#FFFFFF",
			},
		},
	},
});
