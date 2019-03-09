import Vue from 'vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import App from './App.vue'
import router from './router'
import vueCookie from 'vue-cookie'
import 'muse-ui-progress/dist/muse-ui-progress.css';
import NProgress from 'muse-ui-progress';

Vue.use(MuseUI);
Vue.use(NProgress, { size: 3, color: 'orange' });
Vue.use(vueCookie);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')