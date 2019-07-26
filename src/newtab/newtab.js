import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';
import Vuetify from 'vuetify';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

const vuetifyOptions = {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
};
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(App),
});
