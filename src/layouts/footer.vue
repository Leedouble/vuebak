<template>
  <div class="g-common-footer">
    <!--<p class="u-copyright">深圳明德实验学校<span class="address">地址：</span>客服电话：</p>-->
    <p class="u-company">Copyright 1998 - 2018 Tencent
      <a href="http://www.miitbeian.gov.cn" target="_blank" class="link"></a>All Rights Reserved
    </p>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  @import "../assets/scss/base/config";

  .g-common-footer {
    position: relative;
    width: 100%;
    height: $h-footer;
    background: #323232;
    text-align: center;
    /*line-height: 30px;*/
    font-size: $f-xs;
    color: #fff;
    background-size: cover;
    > .u-copyright {
      color: $c-f;
      > .address {
        display: inline-block;
        margin: 0 25px;
      }
    }
    > .u-company {
      line-height: $h-footer;
      > .link {
        margin-left: $w-grid-space/2;
        color: #fff;
      }
    }
  }
</style>
