import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'

axios.defaults.baseURL = 'https://www.escook.cn'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  render: (h) => h(App),
}).$mount('#app')
