<template>
  <div class="g-common-header">
    <div class="m-header">
      <router-link :to="`/`"><h2 class="u-logo">LOGO</h2></router-link>
      <el-menu class="m-menu" :default-active="$route.fullPath" :router="true" mode="horizontal"
            :background-color="menuBgColor" :text-color="menuFontcolor" :active-text-color="menuActiveColor">
        <el-menu-item v-for="(item,index) in menus" :index="item.url" :key="index">{{item.name}}</el-menu-item>
      </el-menu>
      <div v-if="userObj.id" class="u-user">
        <div class="u-msg">
          <img :src="userObj.avatarUrl" alt="">
          <p class="name">{{userObj.realName}}</p>
        </div>
        <div class="u-menu">
          <a class="link" href="javascript:" @click="logout">退出</a>
        </div>
      </div>
      <div class="u-enter" v-else>
        <a class="link" href="javascript:" @click="login">登录</a>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    components: {},
    data() {
      return {
        menuBgColor: '#fff',
        menuFontcolor: '#333',
        menuActiveColor: '#2c7fe3',
        menus: [
          { name: '学校管理', url: '/school', value: 'school' }
//          { name: '流程管理', url: '/flow', value: 'flow' }
        ]
      }
    },
    computed: {
      userObj() {
        return this.$store.getters.getUser
      }
    },
    created() {
      if (this.menus) {
        this.$store.dispatch('setMenu', this.menus)
      }
    },
    methods: {
      async logout() {
        const res = await this.$httpPost('/api/admin/logout/phone', {}, false)
        if (res.errno === 0) {
          this.$store.dispatch('logout')
          this.$router.replace('/login')
        }
      },
      login() {
        this.$router.push('/login')
      },
      userdetail() {
        this.$router.replace('/school/relation/userdetail?id=' + this.userObj.id)
      }
    }
  }
</script>
<style type="text/css" rel="stylesheet/scss" lang="scss">
  @import "../assets/scss/base/config";

  .g-common-header {
    position: relative;
    height: 100%;
    width: 100%;
    > .m-header {
      position: relative;
      padding: 0 150px 0 $w-nav + $w-grid-space;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid $c-bd-gray;
      background: $c-f-white;
      .u-logo {
        position: absolute;
        height: $h-header;
        width: $w-nav;
        top: 0;
        left: 0;
        color: $c-f-white;
        background: $c-main;
        text-align: center;
      }
      > .m-menu {
        position: relative;
        width: 100%;
        height: 100%;
        line-height: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        > .el-menu-item {
          float: none;
          display: inline-block;
          position: relative;
          vertical-align: top;
          padding-top: 16px;
          font-size: $f-s;
        }
      }
      > .u-enter {
        position: absolute;
        right: $w-grid-space;
        top: ($h-header - 30px)/2;
        height: 30px;
        line-height: 30px;
        font-size: 0;
        &:hover {
          .u-menu {
            height: 60px;
          }
        }
        .link {
          font-size: 14px;
          padding: 10px 16px;
          color: $c-f-white;
        }
      }
      > .u-user {
        position: absolute;
        right: $w-grid-space;
        top: $h-header - 45px;
        height: 45px;
        line-height: 30px;
        padding-bottom: 15px;
        padding-left: 30px + 10px;
        color: $c-f-dark;
        &:hover {
          .u-menu {
            height: 30px;
          }
          .name {
            &:after {
              transform: rotatez(180deg);
            }
          }
        }
        .avatar {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 0;
          left: 0;
        }
        .u-msg {
          cursor: pointer;
          img {
            width: 28px;
            height: 28px;
            display: inline-block;
            vertical-align: middle;
            background: $c-bg-page;
            border-radius: 50%;
          }
        }
        .name {
          display: inline-block;
          vertical-align: middle;
          padding: 0 20px 0 5px;
          &:after {
            transform: rotatez(0);
            transition: transform .3s $bezier;
            position: absolute;
            right: 0;
            top: 10px;
            margin-left: -4px;
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-width: 6px 4px 0;
            border-style: solid;
            border-color: #333 transparent transparent;
          }
        }
        .u-menu {
          background: $c-bg-white;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.20);
          border-radius: 4px 0 4px 4px;
          height: 0;
          overflow: hidden;
          transition: height .3s $bezier;
          transform: translateZ(0);
          position: absolute;
          right: 0;
          top: $h-header - 8px;
          width: 95px;
          text-align: center;
          .link {
            display: block;
            line-height: 30px;
            font-size: 12px;
            color: #5D5954;
            &:hover {
              background-color: #EBEBEB;
            }
          }
        }
      }
      .el-menu-item {
        height: 100%;
        line-height: 100%;
        padding-top: 24px;
      }
      .el-menu--horizontal {
        border-bottom: 0;
      }
    }
  }
</style>
