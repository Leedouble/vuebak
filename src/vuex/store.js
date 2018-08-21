'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}

const userDf = {
  id: '',
  nickName: '',
  avatarUrl: '',
  account: '',
  role: 0
}

function getCookie(name) {
  if (process.browser) {
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(`${name}=`)
      if (start !== -1) {
        start = start + name.length + 1
        let end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        return decodeURIComponent(document.cookie.substring(start, end))
      }
    }
  }
  return ''
}

const userCookie = getCookie('user')
const schoolCookie = getCookie('school')
let user = userDf
if (userCookie) {
  try {
    user = JSON.parse(userCookie)
  } catch (e) {
    user = userDf
  }
}

let school = schoolCookie

/* eslint-disable */
const ua = {
  isChrome: /chrome/i.test(window.navigator.userAgent),
  isMobile: /Mobile/i.test(window.navigator.userAgent),
  isWX: /MicroMessenger/i.test(window.navigator.userAgent),
  isIE9: /﻿MSIE 9/.test(window.navigator.userAgent)
}

const state = {
  ua,
  user,
  notice: {
    toast: {
      clear: '',
      time: '',
      content: '',
      type: ''
    }
  },
  loading: false,
  router: {from: ''},
  socket: {
    live: [],
    common: []
  },
  menu: [],
  leftNav: [],
  schoolId: school
}

/* eslint-enable */
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
