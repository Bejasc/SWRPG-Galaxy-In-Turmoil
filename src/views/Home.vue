<template>
	<v-main>
		<section>
			<v-parallax src="@/assets/falcon.jpg" height="600">
				<v-layout column align-center justify-center class="white--text">
					<h1 class="white--text mb-2 display-1 text-center">{{ appname }}</h1>
					<div class="subheading mb-4 text-center">
						A discord based RPG powered by bots, created by Bejasc
					</div>
					<v-btn class="mt-12" color="primary" dark large href="https://discord.gg/MU4XUVS">Join the fight</v-btn>
					<v-btn class="mt-6" outlined large :to="{ name: 'Tools' }">View Tools</v-btn>
				</v-layout>
			</v-parallax>
		</section>

		<section id="features">
			<v-layout column wrap class="my-12" align-center>
				<v-flex xs12 sm4 class="my-4">
					<div class="text-center">
						<h2 class="headline">Features</h2>
					</div>
				</v-flex>
				<v-flex xs12>
					<v-container grid-list-xl>
						<v-layout row wrap align-center>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large color="primary">mdi-account</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline text-center">Create a Character</div>
									</v-card-title>
									<v-card-text>
										Upon joining a Galaxy in Turmoil, you'll have the ability to create a unique character from one of many races. The character will stay
										associated to your discord account, event after you leave
									</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large color="primary">mdi-sword-cross</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline">Fight for Control</div>
									</v-card-title>
									<v-card-text>
										Participate in timed and interactive battles across a wide range of well known Star Wars planets and locations. Carve out a name for
										yourself and climb the ranks of either the Rebel Alliance or the Galactic Empire
									</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large color="primary">mdi-circle-multiple</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline text-center">Earn your Credits</div>
									</v-card-title>
									<v-card-text>
										If fighting isn't your thing - there's always credits to be made when there's a war about. Ladden your ship with precious cargo, and find a
										proffitable destination to offload for some handy credits
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>
		</section>
	</v-main>
</template>

<script>
// @ is an alias to /src
import Common from "@/data/common.json";

export default {
	name: "Home",
	components: {},
	data: function() {
		return {
			appname: Common.appname,
			author: Common.author,
			company: Common.company,
			email: Common.email,
		};
	},
};
</script>
