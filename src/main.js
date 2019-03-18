import Vue from 'vue'
import 'muse-ui/lib/styles/base.less';
import {
  AppBar,
  Badge,
  Button,
  Divider,
  Drawer,
  Form,
  Helpers,
  Icon,
  List,
  Grid,
  Pagination,
  Progress,
  Slider,
  Switch,
  Tooltip,
  theme
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import App from './App.vue'
import router from './router'
import vueCookie from 'vue-cookie'
import 'muse-ui-progress/dist/muse-ui-progress.css';
import NProgress from 'muse-ui-progress';

Vue.use(AppBar);
Vue.use(Badge);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(Helpers);
Vue.use(Icon);
Vue.use(List);
Vue.use(Grid);
Vue.use(Pagination);
Vue.use(Progress);
Vue.use(Slider);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(theme);

Vue.use(NProgress, { size: 3, color: 'orange' });
Vue.use(vueCookie);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')