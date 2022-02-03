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
		children: [
			{
				path: "hook",
				name: "Hook Builder",
				component: () => import("@/views/Tools/HookBuilder.vue"),
			},
			{
				path: "item",
				name: "Quest Item Builder",
				component: () => import("@/views/Tools/QuestItemCreator.vue"),
			},
			{
				path: "images",
				name: "Image Library",
				component: () => import("@/views/Tools/ImageLibrary.vue"),
			},
			{
				path: "eventBuilder",
				name: "Event Builder",
				component: () => import("@/views/Contributors/EventBuilder.vue"),
			},
		],
	},
	{
		path: "/data",
		name: "Data",
		component: () => import("@/views/Tools.vue"),
		children: [
			{
				path: "npc",
				name: "NPC Directory",
				component: () => import("@/views/Data/NpcDirectory.vue"),
			},
			{
				path: "items",
				name: "Item Directory",
				component: () => import("@/views/Data/ItemDirectory.vue"),
			},
		],
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
