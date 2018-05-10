<template>
  <div class="c-resetpassword-box">
    <el-form ref="resetpasswordForm" label-width="0" @submit.native.prevent="submit" :model="obj" :rules="rules"
             class="u-form">
      <el-form-item label="" prop="password">
        <el-input v-model="obj.password" placeholder="请输入新密码" class="u-input" size="large" type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="againPassword">
        <el-input v-model="obj.againPassword" placeholder="请再次输入密码" class="u-input" type="password"
                  size="large"></el-input>
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
      }
    },
    data() {
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
      const checkAgainPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码'))
        } else if (value !== this.obj.password) {
          return callback(new Error('两次密码输入不一样'))
        }
        return callback()
      }
      return {
        rules: {
          password: [
            { required: true, validator: checkPassword, trigger: 'blur' }
          ],
          againPassword: [
            { required: true, validator: checkAgainPassword, trigger: 'blur' }
          ]
        },
        obj: { password: '', againPassword: '' }
      }
    },
    created() {
    },
    methods: {
      async submit() {
        const validateRes = await new Promise((resolve, reject) => this.$refs.resetpasswordForm.validate(resolve, reject))
        if (!validateRes) {
          return false
        }
        this.$emit('on-handle-event', { password: this.obj.password })
        return true
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../../assets/scss/base/config";

  .c-resetpassword-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px 30px 52px;
    .m-btn {
      width: 100%;
      height: 48px;
      font-size: $f-l;
      margin-top: $h-grid-space;
    }
    .el-form-item {
      margin-bottom: $h-grid-space;
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
