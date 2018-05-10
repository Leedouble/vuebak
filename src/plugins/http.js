'use strict'

import Axios from 'axios'

const qs = require('qs')

// 生成URL查询条件
function serialize(query, type = '?') {
  let urlText = ''
  if (typeof query === 'object') {
    Object.keys(query).forEach((key) => {
      if (typeof query[key] !== 'undefined' && query[key] !== 'undefined' && query[key] !== '') {
        if (type === '?') {
          urlText += `&${key}=${query[key]}`
        } else {
          urlText += `/${key}/${query[key]}`
        }
      }
    })
  }
  return urlText.replace(/^&/, '?')
}

// URL统一处理
function processUrl(url, opt = {}) {
  let apiUrl = ''
  if (process.env.NODE_ENV === 'production') {
    apiUrl = '//api.nodebak.com'
  } else if (process.env.NODE_ENV === 'testing') {
    apiUrl = '//test.api.nodebak.com'
  } else {
    apiUrl = '//dev.api.nodebak.com'
  }
  if (url.startsWith('/api')) {
    url = url.replace('/api', apiUrl)
    return url + serialize(opt)
  }
  return url
}

// http请求统一处理 增加默认值
function httpToast(res, content) {
  if (content) {
    let type = 'error'
    if (content === true && res.data) {
      content = res.data.errmsg
    }
    if (res && res.data) {
      if (res.data.errno === 0) {
        type = 'success'
      } else {
        content = res.data.errmsg
      }
    }
    this.$store.dispatch('toast', { type, content })
  }
}

// 部分浏览器读取缓存，JSON会读成字符串
function stringParse(data) {
  const defaultRes = {
    errno: '',
    errmsg: '',
    data: {}
  }
  if (!data) {
    return defaultRes
  }
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      data = Object.assign({}, defaultRes)
    }
  }
  return data
}

let isIE9 = false
if (process.browser) {
  isIE9 = window.navigator.userAgent.indexOf('MSIE 9.0') > 0
}

const reqConfig = {
  timeout: 30000,
  responseType: isIE9 ? 'text' : 'json',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
    // 'Content-Type': isIE9 ? 'application/x-www-form-urlencoded' : 'application/json'
  }
}
const http = Axios.create(reqConfig)
const httpGet = function (url, opt = {}, toastData = false, callback) {
  const req = {}
  if (url.startsWith('/api')) { // 后台操作，带上 cookie
    req.withCredentials = true
  }
  req.url = processUrl(url, opt)
  return http(req).then((res) => {
    res.data = stringParse(res.data) // 部分浏览器读取缓存，JSON会读成字符串
    httpToast.call(this, res, toastData)
    if (callback) {
      callback(res.data)
    }
    return res.data
  }, (res) => { // 请求失败
    return {
      errno: 5000,
      errmsg: res.response ? `数据请求出错 ${res.response.status} - ${res.response.statusText}` : `数据请求出错 ${res.message}`,
      data: ''
    }
  })
}

const httpPost = function (url, opt = {}, toastData = '更新成功', callback) {
  const realUrl = processUrl(url)
  return http.post(realUrl, isIE9 ? qs.stringify(opt) : opt, { withCredentials: true }).then((res) => {
    res.data = stringParse(res.data)
    httpToast.call(this, res, toastData)
    if (callback) {
      callback(res.data)
    }
    return res.data
  }, (res) => {
    return {
      errno: 5000,
      errmsg: res.response ? `数据请求出错 ${res.response.status} - ${res.response.statusText}` : `数据请求出错 ${res.message}`,
      data: ''
    }
  })
}

const VueHttp = {}
VueHttp.install = function VueHttp(Vue) {
  Vue.prototype.$httpGet = httpGet
  Vue.prototype.$httpPost = httpPost
}

export default VueHttp
