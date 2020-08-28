import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
Vue.prototype.$axios = Axios;

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});