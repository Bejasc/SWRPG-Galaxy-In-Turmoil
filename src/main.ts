import "./registerServiceWorker";
import "./styles.scss";

import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import dotenv from "dotenv";

dotenv.config();

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: h => h(App),
}).$mount("#app");

document.title = "SWRPG - Galaxy in Turmoil";

router.afterEach((to, from) => {
	// Use next tick to handle router history correctly
	// see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
	Vue.nextTick(() => {
		document.title = `SWRPG - ${to.name}`;
	});
});
