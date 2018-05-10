<template>
  <div id="p-loading">
    <div class="pic loading" v-if="loading">
      abc
    </div>
  </div>
</template>
<script type="es6">
  export default {
    data() {
      return {
        loading: false
      }
    },
    created() {
      setTimeout(() => {
        this.loading = true
      }, 200)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../assets/scss/base/config";

  #p-loading {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
    z-index: 999;
    > .pic {
      text-align: center;
      position: relative;
      top: 150px;
      min-height: 436px;
      margin: auto;
      &.loading {
      }
    }
  }
</style>
