import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

import {Container, Header, Aside, Main, Footer,Row,Col,Message} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = Message;
Vue.config.productionTip = false;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
