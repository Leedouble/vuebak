<template>
  <div class="c-login-box">
    <el-form class="m-form-box" ref="loginForm" label-width="0" @submit.native.prevent="login" :model="obj"
             :rules="rules">
      <el-form-item label="" prop="account">
        <span @click="clearAccount">
          <vicon name="close" class="u-icon-same" v-show="obj.account !== '' "></vicon>
        </span>

        <el-input class="u-log-ipt" v-model="obj.account" placeholder="请输入账号" size="large">
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <span @click="changeInputType">
           <vicon name="eye" class="u-icon-same" v-show="obj.password !== '' && passwordType === 'text' "></vicon>
        <vicon name="eyeclose" class="u-icon-same" v-show="obj.password !== '' && passwordType === 'password' "></vicon>
        </span>
        <el-input class="u-log-ipt" v-model="obj.password" placeholder="请输入密码" size="large" :type="passwordType">
        </el-input>
      </el-form-item>
      <el-button class="u-log-btn" :disabled="isLogin" :loading="isLogin" type="primary" native-type="submit">登录
      </el-button>
      <router-link to="/find-password">
        <el-button plain class="u-log-fgt">忘记密码?</el-button>
      </router-link>
    </el-form>
  </div>
</template>
<script type="text/babel">

  export default {
    components: {},
    props: {
      isLogin: {
        type: Boolean,
        required: true
      }
    },
    data() {
      const checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        return callback()
      }
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 20) {
          return callback(new Error('请输入6至20个字母'))
        } else if (!/^[A-z0-9]*([A-z]+[0-9]+|[0-9]+[A-z]+)[A-z0-9]*$/.test(value)) {
          return callback(new Error('请包含数字和字母'))
        }
        return callback()
      }
      return {
        rules: {
          account: [
            { required: true, validator: checkAccount, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: checkPassword, trigger: 'blur' }
          ]
        },
        obj: {
          account: '',
          password: ''
        },
        passwordType: 'password'
      }
    },
    created() {
    },
    methods: {
      async login() {
        const validateRes = await new Promise((resolve, reject) => this.$refs.loginForm.validate(resolve, reject))
        if (!validateRes) {
          return false
        }
        this.$emit('on-handle-event', this.obj)
        return true
      },
      clearAccount() {
        this.obj.account = ''
      },
      changeInputType() {
        if (this.passwordType === 'password') {
          this.passwordType = 'text'
        } else {
          this.passwordType = 'password'
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../../assets/scss/base/config";

  .c-login-box {
    .m-form-box {
      > div {
        display: block;
        width: 100%;
        .u-log-ipt {
          input {
            height: $h-l;
            line-height: $h-l;
            padding: 0 20px;
            border: 1px solid $c-bd-gray;
            border-radius: 2px;
            &:focus {
              border-color: $c-input-foucs;
            }
          }
          .m-log-icon {

          }
        }
        .u-icon-same {
          position: absolute;
          top: 50%;
          right: 0;
          height: 20px;
          margin-top: -10px;
          width: 40px;
          cursor: pointer;
          z-index: 1;
          &:hover {
            opacity: 0.6;
          }
        }
        .svg-icon {
          fill: $c-f-ccc;
        }
      }
      .u-log-fgt {
        float: right;
        margin: 10px 10px 0 0;
        padding: 0;
        color: $c-f-gray;
        text-align: right;
        font-size: $f-s;
        border: none;
        &:hover, &:active {
          color: $c-main;
        }
      }
      .u-log-btn {
        width: 100%;
        height: $h-l;
        margin-top: 20px;
      }
    }
  }
</style>
