import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import homepage from '../components/homepage.vue';
import self from '../components/self.vue';
import help from '../components/help.vue';
import dingding from '../components/dingding.vue';
import helpadd from '../components/helpadd.vue';
import helpreply from '../components/helpreply.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/dingding', component: dingding },
  {
    // redirect: '/home',
    path: '/home',
    component: home,
    redirect: '/homepage',
    children: [
      { path: '/help', component: help },
      { path: '/helpadd', component: helpadd },
      { path: '/helpreply', component: helpreply },
      { path: '/self', component: self },
      { path: '/homepage', component: homepage },
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
