<template>
	<v-row justify="center"> </v-row>
</template>

<script lang="ts">
import { IAzureImage } from "@/types/AzureImage";
export default {
	data: () => ({
		dialog: false,
	}),
	props: {
		blob: Object as () => IAzureImage,
	},
};
</script>
