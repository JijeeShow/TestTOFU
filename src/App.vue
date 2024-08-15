<template>
  <v-app>

      <MyAppBarComponent />
      <router-view />

      <!-- <v-footer>
        <v-col class="text-center">
          <p>Kittipat Chofa</p>
        </v-col>
      </v-footer> -->

  </v-app>
</template>

<script>
import MyAppBarComponent from "./components/Appbar.vue";

export default {
  name: "MyApp",
  components: {
    MyAppBarComponent,
  },
};
</script>

<style>
.content {
  display: flex;
 
}
</style>
