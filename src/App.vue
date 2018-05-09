<template>
  <div id="app"
       :class="{'z-app-top':header, 'z-app-bottom':footer,'z-app-left':left,'z-app-right':right}">
    <icon-svg id="icon-list"></icon-svg>
    <div class="l-header" v-if="header">
      <l-header></l-header>
    </div>
    <div class="l-left" :class="{'z-left-header':header, 'z-left-footer':footer}" v-if="left">
      <left-nav></left-nav>
    </div>
    <div class="l-content">
      <loading-page v-if="$store.getters.getLoading"></loading-page>
      <router-view class="page" v-else></router-view>
    </div>
    <div class="l-right" :class="{'z-right-header':header, 'z-right-footer':footer}" v-if="right">
      <right-nav></right-nav>
    </div>
    <div class="l-footer" v-if="footer">
      <l-footer></l-footer>
    </div>
    <!--<notice></notice>-->
  </div>
</template>

<script>
  import LHeader from './layouts/header'
  import LFooter from './layouts/footer'
  import LeftNav from './layouts/left-nav'
  import RightNav from './layouts/right-nav'
  import IconSvg from './layouts/unit/icon'
  import Notice from './layouts/unit/notice'
  import LoadingPage from './layouts/loading-page'

  export default {
    name: 'app',
    components: { LHeader, LFooter, LeftNav, RightNav, IconSvg, Notice, LoadingPage },
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
      }
    },
    data() {
      return {}
    },
    created() {
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "./assets/scss/base.scss";

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $c-bg-gray;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    border-radius: 4px;
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
      position: absolute;
      top: 0;
      left: 0;
      height: $h-header;
      width: 100%;
      z-index: 999;
    }
    > .l-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      height: $h-footer;
      width: 100%;
      z-index: 999;
    }
    > .l-left {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: $w-left-nav;
      padding: 0;
      z-index: 999;
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
      padding: 0;
      z-index: 999;
      &.z-right-header {
        padding-top: $h-header;
      }
      &.z-right-footer {
        padding-bottom: $h-footer;
      }
    }
    > .l-content {
      position: relative;
      height: 100%;
      width: 100%;
    }
    > .g-common-toast {
      padding: $w-grid-space;
      max-width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba($c-bg-black, 0.8);
      color: $c-f-white;
      border-radius: 2px;
    }
  }

  #left-nav {
    width: $w-nav;
    height: 100%;
    position: absolute;
    padding-top: $h-header + 5px;
    box-sizing: border-box;
    overflow-y: auto;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: $c-aid;
    .el-menu {
      border-right: 0;
      background-color: $c-aid;
    }
    .el-submenu__title {
      line-height: 40px;
      height: 40px;
      font-size: $f-xs;
    }
    .el-menu-item {
      line-height: 40px;
      height: 40px;
      min-width: $w-nav;
      font-size: $f-xs;
    }
  }

  .right-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 34px $w-grid-space $h-grid-space $w-grid-space+$w-nav;
    > .bread {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 34px;
      padding-left: $w-grid-space+$w-nav;
      padding-top: $h-grid-space/2;
      .el-breadcrumb__item {
        > .el-breadcrumb__inner {
          font-size: $f-xs;
          color: $c-f-gray;
          font-weight: 400;
          &:hover {
            color: $c-main;
          }
        }
        &:last-child {
          > .el-breadcrumb__inner {
            color: $c-f-dark;
          }
        }
      }
    }
    > .main {
      position: relative;
      width: 100%;
      height: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.20);
      border-radius: 4px;
      padding: $h-grid-space $w-grid-space;
      background-color: $c-bg-white;
      overflow-y: auto;
    }
  }
</style>
