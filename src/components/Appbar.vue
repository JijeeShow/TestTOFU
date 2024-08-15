<template>
  <div class="appbar">
    <v-app-bar :elevation="10">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Part App</v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script >
export default {
  name: "MyAppBarComponent",
};
</script>

<style scoped>
.appbar {
  height: max-content;
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
