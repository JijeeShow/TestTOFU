import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; 
import { VTable } from 'vuetify/lib'; // Import VTable if necessary

Vue.component('v-table', VTable); // Register VTable globally if necessary

new Vue({
  el: '#app',
  router,
  vuetify, 
  render: h => h(App),
});
