<template>
  <div class="g-common-left-nav">
    <el-menu :default-active="$route.fullPath" background-color="#1f2132" text-color="#fff"
             active-text-color="#2c7fe3" :router="true">
      <el-submenu v-for="(item,index) in navList" :index="item.index" :key="index">
        <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
        <el-menu-item v-for="(childItem,childIndex) in item.children" :key="childIndex" :index="childItem.url">
          <i :class="childItem.icon"></i>{{childItem.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {}
    },
    computed: {
      navList() {
        let list = []
        if (this.$store.getters.getLeftNav) {
          list = this.$store.getters.getLeftNav
        }
        return list
      },
      routeList() {
        return this.$route.path.split('?')[ 0 ].split('/')
      },
      currentRoute() {
        return this.$route.path.split('?')[ 0 ]
      },
      menuMap() {
        const menuList = this.$store.getters.getMenu
        const obj = {}
        for (let i = 0; i < menuList.length; i += 1) {
          obj[ menuList[ i ].value ] = menuList[ i ]
        }
        return obj
      },
      navMap() {
        const obj = {}
        for (let i = 0; i < this.navList.length; i += 1) {
          for (let j = 0; j < this.navList[ i ].children.length; j += 1) {
            obj[ this.navList[ i ].children[ j ].url ] = this.navList[ i ].children[ j ]
          }
        }
        return obj
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import '../assets/scss/base.scss';

  .g-common-left-nav {
    position: relative;
    width: $w-left-nav;
    height: 100%;
    background-color: $c-aid;
    overflow-y: auto;
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
      min-width: $w-left-nav;
      font-size: $f-xs;
    }
  }
</style>
