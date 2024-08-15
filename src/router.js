import Vue from 'vue';
import Router from 'vue-router';
import CreatePage from './views/CreatePage.vue';
import HomePage from './views/HomePage.vue';
import ImportPage from './views/ImportPage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/create',
            name: 'Create',
            component: CreatePage,
        },
        {
            path: '/import',
            name: 'Import',
            component: ImportPage,
        },
    ],
});
