<template>
	<v-main>
		<section id="docs">
			<v-parallax src="@/assets/tatooine.jpg" height="300">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">Documentation</h1>
				</v-layout>
			</v-parallax>

			<v-col cols="12" class="ma-0 pa-0">
				<v-row justify="left" fill-height>
					<v-col cols="2" class="ma-0 pa-0">
						<DocSidebar />
					</v-col>
				</v-row>
			</v-col>
		</section>
	</v-main>
</template>

<script>
// @ is an alias to /src
import DocSidebar from "@/components/DocSidebar";
export default {
	name: "Docs",
	components: { DocSidebar },
};
</script>
