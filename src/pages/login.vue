<template>
  <div id="p-login">
    <div class="g-box">
      <div class="m-box">
        <h2 class="u-title">登录</h2>
        <div class="m-content">
          <login-box @on-handle-event="login" :is-login="isLogin"></login-box>
        </div>
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
          phone: '',
          passwd: ''
        },
        isLogin: false
      }
    },
    created() {
    },
    methods: {
      async login(obj) {
        this.loginObj = {
          phone: obj.phone,
          passwd: md5.hex(`ming${obj.passwd}`)
        }
        this.isLogin = true
        const loginRes = await this.$httpPost('/api/admin/login/phone', this.loginObj, false)
        this.isLogin = false
        if (loginRes.errno === 0) {
          this.$store.dispatch('login', loginRes.data)
          this.$store.dispatch('setSchool', '1')
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
    background-color: $c-bg-gray;
    > .g-box {
      position: absolute;
      top: 50%;
      left: 0;
      height: 354px;
      width: 100%;
      margin-top: 0 - 354px/2;
      > .m-box {
        position: relative;
        width: 388px;
        height: 100%;
        margin: 0 auto;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.20);
        border-radius: 4px;
        background-color: $c-bg-white;
        padding-top: 64px;
        > .u-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px;
          text-align: center;
          padding-top: 30px;
          font-size: $f-l;
          color: $c-main;
          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 150px;
            width: 88px;
            height: 2px;
            background-color: #4092f4;
          }
        }
        > .m-content {
          position: relative;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
