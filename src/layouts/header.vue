<template>
  <div class="g-common-header">
    <div class="m-header" :style="{ width: hdWidth }">
      <div class="m-header-left" v-if="isIde">
        <div class="m-header-back-wraper" @click="goBack">
          <vicon name="icon_back" class="icon_back"></vicon>
          <div class="m-header-back-name">返回</div>
        </div>
        <router-link :to="`/`">
          <vicon name="logo" class="logo"></vicon>
        </router-link>
      </div>
      <router-link :to="`/`" v-if="!isIde">
        <vicon name="logo" class="u-logo"></vicon>
      </router-link>
      <el-menu v-if="!isIde" class="m-menu" :default-active="defaultActive" :router="true" mode="horizontal"
               :text-color="menuFontcolor" :active-text-color="menuActiveColor">
        <el-menu-item v-for="(item,index) in menus" v-if="item.isShow" :index="item.url" :key="index">{{item.name}}
        </el-menu-item>
      </el-menu>
      <div v-if="userObj.id" class="u-user">
        <div class="u-msg">
          <!--<img :src="userObj.avatarUrl" alt="">-->
          <p class="name">嗨，{{userObj.nickName ? userObj.nickName : userObj.account}}</p>
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
        menuFontcolor: '#333',
        menuActiveColor: '#2c7fe3',
        defaultActive: '',
        menus: [],
        isIde: false,
        hdWidth: '1002px'
      }
    },
    computed: {
      userObj() {
        return this.$store.getters.getUser
      }
    },
    mounted() {
      this.isIde = this.$route.path.indexOf('ide') >= 0
      if (this.isIde) {
        this.hdWidth = '100%'
      } else {
        this.hdWidth = '1002px'
      }
    },
    watch: {
      $route(val) {
        this.isIde = val.path.indexOf('ide') >= 0
        if (this.isIde) {
          this.hdWidth = '100%'
        } else {
          this.hdWidth = '1002px'
        }
      }
    },
    created() {
      if (this.menus) {
        this.$store.dispatch('setMenu', this.menus)
        for (let list of this.menus) {
          for (let child of list.children) {
            if (child.url === this.$route.path) {
              this.defaultActive = list.url
            }
          }
        }
        if (this.userObj && this.userObj.role === 1) {
          for (let list of this.menus) {
            if (list.url === '/student-works') {
              list.isShow = false
            }
          }
        }
      }
    },
    methods: {
      async logout() {
        const res = await this.$httpPost('/api/user/logout', {}, false)
        if (res.errno === 0) {
          this.$store.dispatch('logout')
          this.$router.replace('/login')
        }
      },
      login() {
        this.$router.push('/login')
      },
      goBack() {
        history.back()
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
    min-width: $w-page-content;
    border-bottom: 1px solid $c-bd-gray;
    background: $c-f-white;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
    > .m-header {
      position: relative;
      width: $w-page-content;
      height: 100%;
      margin: 0 auto;
      > .m-header-left {
        height: 59px;
        display: flex;
        align-items: center;
        > .m-header-back-wraper {
          display: flex;
          align-items: center;
          cursor: pointer;
          > .m-header-back-name {
            font-size: 14px;
            color: #195BE6;
            margin-left: 10px;
          }
          > .icon_back {
            width: 20px;
            height: 20px;
            fill: #195BE6;
            margin-left: 15px;
          }
        }
        .logo {
          width: 96px;
          height: 24px;
          margin-left: 40px;
          fill: #195BE6;
        }
      }
      .u-logo {
        position: absolute;
        top: 0;
        left: 0;
        height: $h-header;
        width: $w-left-nav;
        color: $c-f-white;
        text-align: center;
        line-height: $h-header;
        fill: $c-main;
      }
      > .m-menu {
        position: relative;
        margin: 0 0 0 $w-left-nav;
        height: 90%;
        line-height: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        text-align: center;
        > .el-menu-item {
          padding: 0 8px;
          margin: 0 24px;
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
              background-color: #E3F1FF;
              color: $c-main;
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
