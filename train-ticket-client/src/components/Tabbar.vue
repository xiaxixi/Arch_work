<template>
  <van-tabbar v-model="active" active-color="#07c160" v-if="show">
    <van-tabbar-item icon="logistics" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="goods-collect-o" to="/mail">商旅</van-tabbar-item>
    <van-tabbar-item icon="notes-o" to="/announcement">公告</van-tabbar-item>
    <van-tabbar-item icon="pending-payment" to="/order">订单</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/about">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'Tabbar',

  components: {
    /* eslint-disable vue/no-unused-components */
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  mounted() {
    if (this.$route.name === 'home') this.active = 0;
    if (this.$route.name === 'mail') this.active = 1;
    if (this.$route.name === 'new') this.active = 2;
    if (this.$route.name === 'order') this.active = 3;
    if (this.$route.name === 'about') this.active = 4;
    if (this.$route.name === 'login') this.show = false;
    if (this.$route.name === 'register') this.show = false;
    if (this.$route.name === 'search') this.show = false;
  },

  watch: {
    $route: function(nv) {
      switch (nv.name) {
        case 'login':
          this.show = false;
          break;
        case 'register':
          this.show = false;
          break;
        case 'search':
          this.show = false;
          break;
        default:
          this.show = true;
          break;
      }
    }
  },

  data() {
    return {
      active: null,
      show: true
    };
  }
};
</script>
