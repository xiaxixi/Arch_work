<template>
  <div class="order-item">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'OrderItem',

  components: {
    [NavBar.name]: NavBar
  },

  data() {
    return {
      title: 'loading...',
      cols: {
        unpaid: '待支付',
        paid: '已支付',
        all: '本人车票'
      }
    };
  },

  mounted() {
    this.title = this.cols[this.$route.params.type];
    window.console.log(this.title);
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
