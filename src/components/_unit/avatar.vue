<template>
  <div class="u-avatar">
    <img v-if="src" :src="src" alt="" class="pic" :class="{'z-offline':offline}">
    <div class="pic pic-stu" v-else-if="role === 'student' && !offline"></div>
    <div class="pic pic-stu-g" v-else-if="role === 'student' && offline"></div>
    <div class="pic pic-tch" v-else-if="role === 'avatar' && !offline"></div>
    <div class="pic pic-tch-g" v-else-if="role === 'avatar' && offline"></div>
    <div v-if="forbid" class="forbid-box">
      <v-icon class="forbid" name="forbid"></v-icon>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      role: '',
      forbid: Boolean,
      src: '',
      offline: Boolean
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/base/config";

  .u-avatar {
    display: inline-block;
    margin-top: -2px;
    width: 30px;
    padding: 2px;
    height: 30px;
    border-radius: 100%;
    /*background: #D8D8D8;*/
    /*border: 1px solid #979797;*/
    position: relative;
    &.z-offline {
      &:after {
        position: absolute;
        z-index: 98;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: rgba(#D8D8D8, .6);
      }
    }
    .icon, .pic {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }
    .pic-stu {
    }
    .pic-stu-g {
    }
    .pic-tch {
    }
    .pic-tch-g {
    }
    .pic {
      background-size: contain;
      border-radius: 100%;
    }
    .forbid-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
      padding: 2px;
      .forbid {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        fill: #FE6D75;
      }
    }
  }
</style>
