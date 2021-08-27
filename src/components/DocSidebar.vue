<template>
	<v-list>
		<v-list-group no-action>
			<template v-slot:activator>
				<v-list-item-content>
					<v-list-item-title>Getting Started</v-list-item-title>
				</v-list-item-content>
			</template>
			<v-list-item>
				<v-list-item-title>Create your Character</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Travelling the Galaxy</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Earning Credits</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Combat</v-list-item-title>
			</v-list-item>
		</v-list-group>

		<v-list-group no-action>
			<template v-slot:activator>
				<v-list-item-content>
					<v-list-item-title>Core Concepts</v-list-item-title>
				</v-list-item-content>
			</template>
			<v-list-item>
				<v-list-item-title>Characters</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Races</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Locations</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>Ships</v-list-item-title>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "DocSidebar",
});
</script>
