<template>
  <div id="m-notice">
    <div class="u-toast" :class="toast.type">
      <div class="content" v-html="toast.content"></div>
      <a href="javascript:;" @click="$store.dispatch('toast',{})" class="close">
        <!--<v-icon name="close" class="icon"></v-icon>-->
      </a>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    computed: {
      toast() {
        return this.$store.getters.getNotice.toast
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import "../../assets/scss/base/config";

  #m-notice {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    .u-toast {
      position: absolute;
      top: 0 - $h-header;
      left: 0;
      z-index: 9999;
      text-align: center;
      font-size: 18px;
      color: #fff;
      line-height: 60px;
      height: 60px;
      width: 100%;
      transition: top 0.3s $bezier, background 0.3s $bezier;
      &.info {
        background: $c-info;
        top: 0;
      }

      &.error {
        background: $c-error;
        top: 0;
      }

      &.success {
        background: $c-main;
        top: 0;
      }

      &.warn {
        background: $c-warn;
        top: 0;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        .icon {
          display: block;
          fill: #fff;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin: 10px;
        }
      }
    }
  }
</style>
