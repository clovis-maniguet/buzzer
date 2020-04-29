import Vue from 'vue'
import Vuex from 'vuex'
import vm from '../main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isConnected: false,
    sessionId: null,
    connectedUsers: 0,
    room: {}
  },
  getters: {
    sessionId: (state) => state.sessionId,
    room: (state) => state.room,
    connectedUsers: (state) => state.connectedUsers
  },
  mutations: {
    socket_connected (state, { sessionId }) {
      state.isConnected = true
      state.sessionId = sessionId
    },
    socket_room_joined (state, room) {
      state.room = { id: room }
    },
    socket_connected_users (state, connectedUsers) {
      state.connectedUsers = connectedUsers
    },
    socket_room_created (state, createdRoom) {
      state.room = JSON.parse(JSON.stringify(createdRoom))
    }
  },
  actions: {
    join: (ctx, options) => {
      vm.$socket.emit('join', options)
    },
    createRoom: (ctx, options) => {
      vm.$socket.emit('create room', options)
    }
  },
  modules: {}
})
