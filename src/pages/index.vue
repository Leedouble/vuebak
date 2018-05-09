<template>
  <div id="p-index">
    <h1>{{ currentTime | datetime('YYYY-MM-DD HH/mm/ss') }}</h1>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'index',
    data() {
      return {
        currentTime: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.currentTime = '2018-05-16'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
