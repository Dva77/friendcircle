import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vant);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');