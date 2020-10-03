
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router'

//Vue 2.6.12

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
