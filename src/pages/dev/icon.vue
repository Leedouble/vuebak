<template>
  <div id="p-dev-icon">
    <div class="g-common-content">
      <div class="m-list">
        <div class="m-item" v-for="(item,index) in icons" :key="index">
          <vicon :name="item" size="xl"></vicon>
          <p class="name">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data() {
      return {
        icons: []
      }
    },
    mounted() {
      const iconListEl = window.document.getElementById('icon-list')
      const symbolList = iconListEl.getElementsByTagName('symbol')
      for (let i = 0; i < symbolList.length; i += 1) {
        const id = symbolList[i].getAttribute('id').replace('icon-', '')
        this.icons.push(id)
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  @import "../../assets/scss/base/config.scss";

  #p-dev-icon {
    .m-list {
      .m-item {
        float: left;
        font-size: 18px;
        text-align: center;
        width: 200px;
        padding: $w-grid-space 0;
      }
    }
  }
</style>
