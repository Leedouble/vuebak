<template>
  <div id="app"
       :class="{'z-app-top':header, 'z-app-bottom':footer, 'z-app-left':left, 'z-app-right':right}">
    <icon-svg id="icon-list"></icon-svg>
    <div class="l-header" v-if="header">
      <l-header></l-header>
    </div>
    <div class="l-left" v-if="left" :class="{'z-left-header':header, 'z-left-footer':footer}">
      <left-nav></left-nav>
    </div>
    <div class="l-content">
      <loading v-if="$store.getters.getLoading"></loading>
      <router-view ref="content" class="page" v-else></router-view>
    </div>
    <div class="l-right" v-if="right" :class="{'z-right-header':header, 'z-right-footer':footer}">
      <right-nav></right-nav>
    </div>
    <div class="l-footer" v-if="footer || infooter" :class="{'z-footer-absolute':footer}">
      <l-footer></l-footer>
    </div>
    <div class="l-notice" v-if="notice">
      <notice></notice>
    </div>
  </div>
</template>

<script type="text/babel">
  import LHeader from './layouts/header'
  import LFooter from './layouts/footer'
  import LeftNav from './layouts/left-nav'
  import RightNav from './layouts/right-nav'
  import Loading from './layouts/loading'
  import IconSvg from './layouts/unit/icon'
  import Notice from './layouts/notice'

  export default {
    name: 'app',
    components: { LHeader, LFooter, LeftNav, RightNav, IconSvg, Notice, Loading },
    computed: {
      header() {
        let flag = false
        if (this.$route && this.$route.meta && this.$route.meta.layout && this.$route.meta.layout.header) {
          flag = this.$route.meta.layout.header
        }
        return flag
      },
      footer() {
        let flag = false
        if (this.$route && this.$route.meta && this.$route.meta.layout && this.$route.meta.layout.footer) {
          flag = this.$route.meta.layout.footer
        }
        return flag
      },
      infooter() {
        let flag = false
        if (this.$route && this.$route.meta && this.$route.meta.layout && this.$route.meta.layout.infooter) {
          flag = this.$route.meta.layout.infooter
        }
        return flag
      },
      left() {
        let flag = false
        if (this.$route && this.$route.meta && this.$route.meta.layout && this.$route.meta.layout.left) {
          flag = this.$route.meta.layout.left
        }
        return flag
      },
      right() {
        let flag = false
        if (this.$route && this.$route.meta && this.$route.meta.layout && this.$route.meta.layout.right) {
          flag = this.$route.meta.layout.right
        }
        return flag
      },
      notice() {
        let flag = false
        if (this.$store && this.$store.getters.getNotice.toast && this.$store.getters.getNotice.toast.content !== '') {
          flag = true
        }
        return flag
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "./assets/scss/base.scss";

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    &.z-app-top {
      padding-top: $h-header;
    }
    &.z-app-bottom {
      padding-bottom: $h-footer;
    }
    &.z-app-left {
      padding-left: $w-left-nav;
    }
    &.z-app-right {
      padding-right: $w-right-nav;
    }
    > .l-header {
      height: $h-header;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }
    > .l-footer {
      height: $h-footer;
      width: 100%;
      z-index: 999;
      &.z-footer-absolute {
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    > .l-left {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: $w-left-nav;
      &.z-left-header {
        padding-top: $h-header;
      }
      &.z-left-footer {
        padding-bottom: $h-footer;
      }
    }
    > .l-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: $w-right-nav;
      &.z-right-header {
        padding-top: $h-header;
      }
      &.z-right-footer {
        padding-bottom: $h-footer;
      }
    }
    > .l-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
    > .l-notice {
      position: absolute;
      top: 0;
      left: 0;
      height: $h-notice;
      width: 100%;
      z-index: 9999;
    }
  }
</style>
