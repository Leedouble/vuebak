'use strict'

export const login = function ({ commit, state }, user) {
  commit('LOGIN', user)
}
export const logout = function ({ commit }) {
  commit('LOGOUT')
}
export const setSchool = function ({ commit }, schoolId) {
  commit('SCHOOL', schoolId)
}
export const setSocket = function ({ commit, state }, Obj = { type: 'common', event: '', data: '' }) {
  commit('SOCKET', Obj)
}
export const setLoading = function ({ commit }, status) {
  commit('LOADING', status)
}
export const setRouter = function ({ commit }, from) {
  commit('ROUTER', from)
}
export const setMenu = function ({ commit }, menuList) {
  commit('MENU', menuList)
}
/* eslint-disable */
export const toast = function ({ commit, state }, toast = {}) {
  if (toast.content instanceof Object) {
    toast.content = JSON.stringify(toast.content)
  }

  if (state.notice.toast.clear) {
    clearTimeout(state.notice.toast.clear)
  }

  toast.clear = setTimeout(() => {
    commit('TOAST', {})
  }, toast.time || 1000)

  commit('TOAST', toast)
}
