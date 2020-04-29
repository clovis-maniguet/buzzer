import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store'

const socketIo = new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8090',
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
})

Vue.use(socketIo)
