<template>
  <div id="p-login">
    <div class="g-left">
      <div class="m-left-pic"><img src="../assets/image/login-pic.png" alt="图" class="u-pic"></div>
    </div>
    <div class="g-right">
      <p class="g-logo">
        <vicon name="logo" class="u-icon"></vicon>
      </p>
      <div class="g-right-box">
        <h2 class="m-form-title">欢迎登录</h2>
        <login-box @on-handle-event="login" :is-login="isLogin"></login-box>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import LoginBox from '../components/user/login-box'
  import md5 from 'js-md5'

  export default {
    components: { LoginBox },
    data() {
      return {
        loginObj: {
          account: '',
          password: ''
        },
        isLogin: false
      }
    },
    created() {
    },
    methods: {
      async login(obj) {
        this.loginObj = {
          account: obj.account,
          password: md5.hex(`ming${obj.password}`)
        }
        this.isLogin = true
        const loginRes = await this.$httpPost('/api/user/login', this.loginObj, false)
        this.isLogin = false
        if (loginRes.errno === 0) {
          this.$store.dispatch('login', loginRes.data)
          this.$router.replace('/')
        } else {
          this.$message({ message: loginRes.errmsg, type: 'error' })
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../assets/scss/base/config";

  #p-login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $c-bg-wathet;
    display: flex;
    > .g-left {
      width: 50%;
      background: $c-bg-white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > .m-left-pic {
        width: 500px;
        height: 611px;
        > .u-pic {
          width: 100%;
          height: 100%;
        }
      }
    }
    > .g-right {
      flex: 1;
      background: linear-gradient(to bottom left, $c-main, #7263F6);
      .g-logo {
        position: absolute;
        margin: -15px -80px 0 0;
        right: 25%;
        top: 25%;
        width: 155px;
        height: 35px;
        .u-icon {
          width: 100%;
          height: 100%;
          fill: $c-bg-white;
        }
      }
      .g-right-box {
        position: absolute;
        background: $c-bg-white;
        width: 420px;
        height: 350px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin: -175px -210px 0 0;
        padding: 35px 80px 60px 80px;
        right: 25%;
        top: 50%;
        text-align: center;
        .m-form-title {
          width: 100px;
          margin: 0 auto 30px auto;
          border-bottom: 2px solid $c-main;
          font-weight: bolder;
          font-size: $f-l;
          color: $c-main;
          letter-spacing: 0;
        }
        &:before, &:after {
          content: "";
          background: rgba(255, 255, 255, .2);
          position: absolute;
          border-radius: 50%;
        }
        &:before {
          width: 29px;
          height: 29px;
          right: -21px;
          top: 161px;
        }
        &:after {
          width: 173px;
          height: 173px;
          right: -150px;
          top: 250px;
        }
      }
    }
  }
</style>
