<template>
  <div class="c-phonecode-box">
    <el-form ref="phonecodeForm" label-width="0" @submit.native.prevent="submit" :model="obj" :rules="rules"
             class="u-form">
      <el-form-item label="" prop="phone">
        <el-input v-model="obj.phone" placeholder="请输入手机号" class="u-phone-input" size="large"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input v-model="obj.code" placeholder="请输入验证码" class="u-code-input"
                  size="large"></el-input>
        <el-button class="u-code-button" :disabled="allowSend" :plain="true" @click="getCode">{{text}}</el-button>
      </el-form-item>
      <el-button :loading="isSubmit" type="primary" size="large" native-type="submit" class="m-btn">确定
      </el-button>
    </el-form>
  </div>
</template>
<script type="text/babel">

  export default {
    components: {},
    props: {
      isSubmit: {
        type: Boolean,
        required: true
      },
      sendUrl: {
        type: String,
        required: false
      }
    },
    data() {
      const checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'))
        } else if (value.length !== 11 || !/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        }
        return callback()
      }
      const checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        } else if (!/^\d{6}$/.test(value)) {
          return callback(new Error('验证码格式不正确'))
        }
        return callback()
      }
      return {
        rules: {
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          code: [
            { required: true, validator: checkCode, trigger: 'blur' }
          ]
        },
        obj: { phone: '', code: '' },
        maxSecond: 60,
        text: '发送验证码',
        allowSend: true,
        lock: false,
        sUrl: '/api/admin/login/sendusercode'
      }
    },
    watch: {
      obj: {
        handler(newValue) {
          const phone = newValue.phone
          if (/^1[34578]\d{9}$/.test(phone) && !this.lock) {
            this.allowSend = false
          } else {
            this.allowSend = true
          }
        },
        deep: true
      }
    },
    created() {
      if (this.sendUrl) {
        this.sUrl = this.sendUrl
      }
    },
    methods: {
      async getCode() {
        if (this.lock) {
          return false
        }
        this.lock = true
        this.text = '正在发送'
        const res = await this.$httpPost(this.sUrl, { phone: this.obj.phone }, false)
        if (res.errno === 0) {
          this.countDown()
        } else {
          this.$message({ message: res.errmsg, type: 'error' })
          this.resetSendStatus()
        }
        return true
      },
      resetSendStatus() {
        this.text = '发送验证码'
        this.allowSend = false
        this.lock = false
      },
      countDown() {
        this.allowSend = true
        let second = this.maxSecond
        let timeoutId = null
        const that = this
        const timeMachine = function () {
          if (second < 0) {
            clearTimeout(timeoutId)
            that.resetSendStatus()
          } else {
            that.text = `已发送(${second--}s)`
            timeoutId = setTimeout(timeMachine, 1000)
          }
        }
        timeMachine()
      },
      async submit() {
        const validateRes = await new Promise((resolve, reject) => this.$refs.phonecodeForm.validate(resolve, reject))
        if (!validateRes) {
          return false
        }
        this.$emit('on-handle-event', this.obj)
        return true
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../../assets/scss/base/config";

  .c-phonecode-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px 30px 52px;
    .u-code-input {
      width: 220px;
    }
    .u-code-button {
      height: 48px;
      width: 98px;
      border: 1px solid $c-main;
      color: $c-main;
      margin-left: 5px;
      padding: 0;
      &:disabled {
        border-color: $c-f-gray;
        color: $c-f-gray;
      }
    }
    .m-btn {
      width: 100%;
      height: 48px;
      font-size: $f-l;
      margin-top: $h-grid-space;
    }
    .el-form-item {
      margin-bottom: $h-grid-space;
      margin-right: 0;
    }
    .el-input__inner {
      height: 48px;
      border-radius: 2px;
      font-size: $f-s;
      color: $c-f-dark;
    }
    .el-button {
      border-radius: 2px;
    }
  }
</style>
