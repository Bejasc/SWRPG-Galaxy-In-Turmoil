<template>
	<v-main>
		<section id="docs">
			<v-parallax src="@/assets/hoth.png" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Tools</h1>
				</v-layout>
			</v-parallax>

			<v-card>
				<v-container>
					<h1>New Item</h1>
					<v-card>
						<Form :form="loadTemplate()" submission="" options="" style=""></Form>
					</v-card>
				</v-container>
			</v-card>
		</section>
	</v-main>
</template>

<style>
textarea {
	width: 400px;
}
input {
	border: none;
	color: var(--s-500);
	height: 100%;
	min-width: 0px;
	font-family: roboto, "Font Awesome 5 Pro";
	font-size: 14px;
	text-overflow: ellipsis;
	flex-grow: 1;
	flex-shrink: 1;
	margin: 0px 10px;
	box-sizing: border-box;
	-webkit-writing-mode: horizontal-tb !important;
	text-rendering: auto;
	color: -internal-light-dark(black, white);
	letter-spacing: normal;
	word-spacing: normal;
	text-transform: none;
	text-indent: 0px;
	text-shadow: none;
	display: inline-block;
	text-align: start;
	appearance: auto;
	background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
	-webkit-rtl-ordering: logical;
	cursor: text;
	margin: 0em;
	font: 400 13.3333px Arial;
	padding: 1px 2px;
	border-width: 2px;
	border-style: inset;
	border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
	border-image: initial;
}
</style>

<script>
import { Form } from "vue-formio";
import formConfig from "@/types/itemForm.json";

export default {
	name: "Tools",
	components: { Form },
	data: () => {
		return {
			form: {},
		};
	},
	mounted() {
		console.log(this.fCon);
	},
	methods: {
		loadTemplate() {
			console.log("abc");
			return formConfig;
		},
	},
};
</script>
