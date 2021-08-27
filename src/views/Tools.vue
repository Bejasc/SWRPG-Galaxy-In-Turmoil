<template>
	<v-main>
		<section id="docs">
			<v-parallax src="@/assets/hoth.png" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Tools</h1>
				</v-layout>
			</v-parallax>

			<v-container fill-height fluid>
				<v-row align="center" justify="center">
					<v-col cols="5">
						<v-card>
							<h1>New Item</h1>
							<v-card>
								<Form :form="loadTemplate()" submission="ItemInterface" options="" style="" v-on:submit="saveForm()"></Form>
							</v-card>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</v-main>
</template>

<style>
.fileSelector {
	position: relative;
	padding: 15px;
	border: 2px dashed #ddd;
	text-align: center;
	height: 200px;
}
</style>

<script>
import { Form } from "vue-formio";
import formConfig from "@/types/itemForm.json";
import { ItemInterface } from "@/types/Item";

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
		saveForm() {
			console.log("Save form!");
			console.log(this.form.data);
		},
	},
};
</script>
