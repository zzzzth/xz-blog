// store/user.js (Vuex module)

export default {
  namespaced: true,
  state () {
    return {
      userinfo: JSON.parse(localStorage.getItem('userinfo')) || {
        userId: '',
        username: '',
        email: '',
        avatar: ''
      }
    }
  },
  mutations: {
    setUser (state, user) {
      state.userinfo = user
      // 保存到本地存储
      localStorage.setItem('userinfo', JSON.stringify(user))
    },
    clearUser (state) {
      state.userinfo = { userId: '', username: '', email: '' }
      // 清除本地存储
      localStorage.removeItem('userinfo')
    }

  },
  actions: {
    loginUser ({ commit }, user) {
      commit('setUser', user)
    },
    logoutUser ({ commit }) {
      commit('clearUser')
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userinfo
    }
  }
}
