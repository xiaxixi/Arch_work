<template>
  <div class="order">
    <van-nav-bar title="订单"/>
    <van-cell-group>
      <van-cell title="火车票订单" value="温馨提示"/>
    </van-cell-group>
    <van-tabbar v-model="active" class="o-tabbar" active-color="#07c160">
      <van-tabbar-item icon="shop" to="/order/unpaid">待支付</van-tabbar-item>
      <van-tabbar-item icon="chat" to="/order/paid" dot>已支付</van-tabbar-item>
      <van-tabbar-item icon="records" to="/order/all" info="5">本人车票</van-tabbar-item>
    </van-tabbar>

    <van-cell-group>
      <van-cell title="餐饮･特产" icon="location" is-link/>
      <van-cell title="保险订单" icon="location" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import { Button, NavBar, Cell, CellGroup, Tabbar, TabbarItem } from 'vant';

export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data() {
    return {
      active: -1
    };
  },

  mounted() {
    if (this.$route.name === 'order/unpaid') this.active = 0;
    if (this.$route.name === 'order/paid') this.active = 1;
    if (this.$route.name === 'order/all') this.active = 2;
  }
};
</script>

<style>
.o-tabbar {
  position: relative;
  height: 80px;
}

.o-tabbar .van-tabbar-item__icon {
  font-size: 25px;
  margin-bottom: 10px;
}

.o-tabbar .van-tabbar-item__text {
  font-size: 13px;
}
</style>
