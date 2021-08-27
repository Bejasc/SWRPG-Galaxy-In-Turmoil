import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/views/Home.vue";
import Vue from "vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/docs",
		name: "Docs",
		component: () => import("@/views/Docs.vue"),
	},
	{
		path: "/tools",
		name: "Tools",
		component: () => import("@/views/Tools.vue"),
	},
];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
			};
		}
	},
});

export default router;
