<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app color="background">
      <v-spacer />
      <!-- <v-btn outlined>View docs</v-btn> -->
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-row justify="space-around">
            <v-list-item :to="{ name: 'Home' }">Home</v-list-item>
            <v-list-item :to="{ name: 'Docs' }">Docs</v-list-item>
            <v-list-item :to="{ name: 'Tools' }">Tools</v-list-item>
            <v-list-item @click="navigate('https://discord.gg/MU4XUVS')"
              >Join</v-list-item
            >
          </v-row>
        </v-list>
      </v-menu>
    </v-app-bar>

    <router-view class="ma-0 pa-0" />

    <v-footer color="secondary">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-4">
            SWRPG: Galaxy in Turmoil - by Bejasc
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<style>
.container {
  max-width: 100vw;
  padding: 0px;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  methods: {
    navigate: function(target: string) {
      window.open(target, "_blank");
    }
  },
  data: () => ({}),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
});
</script>
