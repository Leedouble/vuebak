<template>
  <div id="p-error-err404">
    <div class="pic empty">
      <p class="empty-text">
        <router-link :to="{path:'/'}">
          返回
        </router-link>
      </p>
    </div>
  </div>
</template>
<script type="text/babel"></script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/base/config";

  #p-error-err404 {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
    > .pic {
      position: relative;
      top: 100px;
      min-height: 436px;
      margin: auto;
      &.empty {
      }
    }
    .empty-text {
      width: 100%;
      position: absolute;
      bottom: -34px;
      text-align: center;
    }
  }
</style>
