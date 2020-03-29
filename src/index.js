import Vue from 'vue';
import App from './App.vue';
import i18n from './core/i18n';
import router from './core/router';
import 'babel-polyfill';
import 'es6-promise/auto';
import store from './generate/store';
import './core/ajax';
import './util/format';
import './diretive/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueJsonp from 'vue-jsonp';
// Vue.use(VueJsonp);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
    router,
    store,
    i18n,
    el: '#app',
    render: h => h(App)
});
