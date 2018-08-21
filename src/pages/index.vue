<template>
  <div id="p-index">
    <!--<h1>{{ currentTime | datetime('YYYY-MM-DD HH/mm/ss') }}</h1>-->
    <template v-if="isSubmit">
      <div class="u-loading" v-loading="isSubmit"></div>
    </template>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'index',
    data() {
      return {
        isSubmit: true
      }
    },
    created() {
      this.isSubmit = true
    }
  }
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">
</style>
