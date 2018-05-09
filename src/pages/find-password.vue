<template>
  <div id="p-find-password">
    <div class="g-box">
      <div class="m-box">
        <p class="u-title">{{title}}</p>
        <div class="m-content">
          <phonecode-box @on-handle-event="verifyCode" :is-submit="isVerify" v-if="currentStep===1"></phonecode-box>
          <resetpassword-box @on-handle-event="modifyPassword" :is-submit="isReset"
                             v-if="currentStep===2"></resetpassword-box>
        </div>
        <router-link to="/login" class="back-login">返回登陆</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import PhonecodeBox from '../components/user/phonecode-box'
  import ResetpasswordBox from '../components/user/resetpassword-box'
  import md5 from 'js-md5'

  export default {
    components: {PhonecodeBox, ResetpasswordBox},
    data() {
      return {
        title: '忘记密码',
        currentStep: 1,
        verifyObj: {
          phone: '',
          passwd: ''
        },
        modifyObj: {
          phone: '',
          password: ''
        },
        isVerify: false,
        isReset: false
      }
    },
    created() {
    },
    methods: {
      async verifyCode(obj) {
        this.verifyObj = {
          phone: obj.phone,
          code: obj.code
        }
        this.isVerify = true
        const verifyRes = await this.$httpPost('/api/admin/findpassword/verifycode', this.verifyObj, false)
        this.isVerify = false
        if (verifyRes.errno !== 0) {
          this.$message({message: verifyRes.errmsg, type: 'error'})
          return false
        }
        this.currentStep++
        this.title = '重置密码'
      },
      async modifyPassword(obj) {
        this.modifyObj = {
          phone: this.verifyObj.phone,
          password: md5.hex(`ming${obj.password}`)
        }
        this.isReset = true
        const modifyRes = await this.$httpPost('/api/admin/findpassword/resetpassword', this.modifyObj, false)
        this.isReset = false
        if (modifyRes.errno !== 0) {
          this.$message({message: modifyRes.errmsg, type: 'error'})
          return false
        }
        this.$router.replace('/login')
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../assets/scss/base/config";

  #p-find-password {
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
        .back-login {
          position: absolute;
          bottom: 20px;
          left: 43%;
          color: $c-main;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
