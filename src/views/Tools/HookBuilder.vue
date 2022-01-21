<template>
	<v-col cols="5">
		<v-card>
			<v-card-title>Hook Builder</v-card-title>
			<v-form class="pa-6 ma-2">
				<v-text-field v-model="hook.title" label="Title" placeholder="Title"></v-text-field>
				<v-textarea v-model="hook.description" label="Description" placeholder="Description"></v-textarea>
				<v-text-field v-model="hook.thumbnail" label="Thumbnail URL (Optional)" placeholder="Image URL"></v-text-field>
				<v-text-field v-model="hook.image" label="Image URL (Optional)" placeholder="Image URL"></v-text-field>

				<v-row justify="space-around">
					<discord-embed color="#121212" :title="hook.title" :thumbnail="hook.thumbnail" :image="hook.image">
						<span v-if="hook.description">
							{{ hook.description }}
						</span>
					</discord-embed>
				</v-row>

				<v-dialog v-model="dialog" width="500">
					<template v-slot:activator="{ on, attrs }">
						<v-row justify="space-around">
							<v-btn color="success" dark v-bind="attrs" v-on="on" v-on:click="saveHook()">
								Get Hook Code
							</v-btn>
							<v-btn color="primary" dark v-on:click="clearForm()">
								Clear Form
							</v-btn>
						</v-row>
					</template>

					<v-card>
						<vue-code-highlight language="json">
							<pre>{{ hookCommand }}</pre>
						</vue-code-highlight>

						<v-card-actions>
							<v-btn color="red" text @click="dialog = false">
								Close
							</v-btn>
							<v-btn color="blue" text @click="copyToClipboard">
								Copy to Clipboard
							</v-btn>
						</v-card-actions>
						<v-snackbar v-model="snackbar" :timeout="timeout"> {{ hook.title }} was copied to clipboard </v-snackbar>
					</v-card>
				</v-dialog>
			</v-form>
		</v-card>
	</v-col>
</template>

<script>
import { Hook } from "@/types/Hook";
import { component as VueCodeHighlight } from "vue-code-highlight";
import DiscordEmbed from "../../components/Discord/DiscordEmbed.vue";
export default {
	name: "HookBuilder",
	components: {
		VueCodeHighlight,
		DiscordEmbed,
	},
	data: () => {
		return {
			hook: new Hook(),
			dialog: false,
			hookCommand: "",
			snackbar: false,
		};
	},
	methods: {
		saveHook() {
			const hookText = this.hook.toCommand();
			this.hookCommand = hookText;
			console.log(hookText);
		},
		copyToClipboard() {
			this.snackbar = true;
			navigator.clipboard.writeText(this.hookCommand);
		},
		clearForm() {
			this.hook = new Hook();
		},
	},
	filters: {
		pretty: function(value) {
			if (!value) return;
			return JSON.stringify(JSON.parse(value), null, 2);
		},
	},
};
</script>
