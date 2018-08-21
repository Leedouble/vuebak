'use strict'

// 设置cookie
function setCookie(name, value = null, expires = 0, path = '/') {
  if (process.browser) {
    const tmpValue = encodeURIComponent(value)
    let eDate = new Date().getTime() + (expires * 1000) +
      (new Date().getTimezoneOffset() * 60 * 1000)
    eDate = new Date(eDate)
    eDate.toUTCString()
    document.cookie = `${name}=${tmpValue};path=${path};expires=${eDate}`
    return document.cookie
  }
  return ''
}

export function LOGIN(state, user) {
  state.user = user
  if (user.id > 0) {
    setCookie('user', JSON.stringify(user), 7 * 24 * 60 * 60)
  }
}

export function LOGOUT(state) {
  state.user = {
    id: '',
    orgId: '',
    avatarUrl: '',
    role: '',
    nickName: ''
  }
  setCookie('user', '', -1)
}

export function SCHOOL(state, schoolId) {
  state.schoolId = schoolId
  if (schoolId > 0) {
    setCookie('school', schoolId, 7 * 24 * 60 * 60)
  }
}

export function TOAST(state, toast) {
  state.notice.toast = toast
}

export function LOADING(state, status) {
  state.loading = status
}

export function ROUTER(state, from) {
  state.router.from = from
}

export function MENU(state, menuList) {
  state.menu = menuList
}

export function SOCKET(state, Obj) {
  if (!(state.socket[Obj.type] && state.socket[Obj.type].push)) {
    state.socket[Obj.type] = []
  }
  state.socket[Obj.type].push({ event: Obj.event, data: Obj.data })
}
