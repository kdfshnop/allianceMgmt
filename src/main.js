// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axiosWrapper from './plugins/axiosWrapper';
import Privileger from './plugins/privileger';
import ElementUI from 'element-ui';
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import "viewerjs/dist/viewer.css"

Vue.use(axiosWrapper);
Vue.use(Privileger);
Vue.use(ElementUI);
// Vue.use(VuePreview);
// Vue.use(Vuex);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
