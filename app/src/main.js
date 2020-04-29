import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/socketio'
import '@babel/polyfill'

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
