function VueTool(Vue) {
  'use strict'

  if (!VueTool.installed) {
    /* eslint-disable no-param-reassign */
    const loadScriptList = {} // 闭包 用于判断脚本是否加载
    let renderJaxTimeId = '' // 闭包 用于公式渲染
    Vue.prototype.$tool = {
      /* eslint-disable no-return-assign */
      getSingle(fn, ...args) {
        let result
        return () => result || (result = fn.apply(this, args))
      },
      loadScript(url) {
        if (!loadScriptList[url]) {
          loadScriptList[url] = true
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = url
          document.body.appendChild(script)
        }
      },
      isLoadDone(script, maxTime = 10000, time = 100) {
        return new Promise((resolve, reject) => {
          const intervalId = setInterval(() => {
            if (window[script]) {
              clearInterval(intervalId)
              resolve(true)
            }
            maxTime -= time
            if (maxTime < 0) {
              clearInterval(intervalId)
              resolve(false)
            }
          }, time)
        })
      },
      /**
       * 渲染公式
       */
      renderJax() {
        this.loadScript('//jsresource.bondketang.com/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML')
        this.isLoadDone('MathJax').then((isDone) => {
          if (isDone) {
            if (renderJaxTimeId) {
              clearTimeout(renderJaxTimeId)
            }
            renderJaxTimeId = setTimeout(() => {
              window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
            }, 200)
          }
        })
      },
      fullScreen(el) {
        const requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
        if (requestMethod) {
          requestMethod.call(el)
        } else if (typeof window.ActiveXObject !== 'undefined') {
          const wscript = new window.ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{F11}')
          }
        }
      },
      exitFullScreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (typeof window.ActiveXObject !== 'undefined') {
          const wscript = new window.ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{ESC}')
          }
        }
      },
      // 是否支持  flash
      // hasFlash() {
      //   let hasFlash = false
      //   try {
      //     hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
      //   } catch (exception) {
      //     hasFlash = (typeof navigator.mimeTypes['application/x-shockwave-flash'] === 'undefined')
      //   }
      //   return hasFlash
      // },
      throttle(method, delay = 500, time = 1000) {
        let timeout
        let startTime = new Date()
        return (...args) => {
          const context = this
          const curTime = new Date()
          clearTimeout(timeout)
          // 如果达到了规定的触发时间间隔，触发 handler
          if (curTime - startTime >= time) {
            method.apply(context, ...args)
            startTime = curTime
            // 没达到触发间隔，重新设定定时器
          } else {
            timeout = setTimeout(method, delay)
          }
        }
      }
    }
  }
}

// 同上，Vue 是全局变量时，自动 install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTool)
}

export default VueTool
