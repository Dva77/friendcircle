import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import homepage from '../components/homepage.vue'
import self from '../components/self.vue'
import help from '../components/help.vue'
import dingding from '../components/dingding.vue'
import issue from '../components/issue.vue'
import other from '../components/other.vue'
import article_comment from '../view/article-component/article_comment'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/dingding', component: dingding },
    { path: '/issue', component: issue },
    { path: '/other', component: other, name: 'other' },
    { path: '/article_comment', component: article_comment },
    {
        // redirect: '/home',
        path: '/home',
        component: home,
        redirect: '/homepage',
        children: [
            { path: '/homepage', component: homepage },
            { path: '/help', component: help },
            { path: '/self', component: self },
        ],
    },
];

// {
//   path: '/',
//   name: 'Home',
// },
// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
// },
// ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;