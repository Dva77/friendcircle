import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import homepage from '../components/homepage.vue';
import self from '../components/self.vue';
import help from '../components/help.vue';
import dingding from '../components/dingding.vue';
import survey from '../components/survey.vue';
import myhelp from '../components/myhelp.vue';
import survey_h from '../components/survey_h.vue';

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
      { path: '/self', component: self },
      { path: '/homepage', component: homepage },
      { path: '/survey', component: survey },
      { path: '/survey_h', component: survey_h },
      { path: '/myhelp', component: myhelp },
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
