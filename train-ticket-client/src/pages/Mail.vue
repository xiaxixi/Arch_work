<template>
  <div class="mail">
    <van-nav-bar title="商旅"/>
    <van-swipe :autoplay="3000" class="banner-show">
      <van-swipe-item v-for="(image, index) in slistsBanner" :key="index">
        <img class="banner-img" :src="image.img">
      </van-swipe-item>
    </van-swipe>
    <travel-item v-for="(item, index) in tlists" :key="index" :img="item.img" :start="item.start" :title="item.title" :price="item.price" :src="item.src"/>
    <div class="stand">&nbsp;</div>
  </div>
</template>

<script>
import { Button, NavBar, Swipe, SwipeItem } from 'vant';
import _ from 'lodash';
import TravelItem from '../components/TravelItem.vue';

export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    TravelItem
  },

  mounted() {
    this.getTravelList();
    this.getServiceList();
  },

  methods: {
    getTravelList() {
      fetch('https://www.12306.cn/index/otn/index12306/getTravelList').then(response => {
        response
          .json()
          .then(data => data.data.index_travel_url)
          .then(lists => {
            this.tlists = lists;
          });
      });
    },
    getServiceList() {
      fetch('https://www.12306.cn/index/otn/index12306/getServiceList').then(response => {
        response
          .json()
          .then(data => data.data)
          .then(lists => {
            this.slistsBanner = _.filter(_.values(lists), 'target');
            this.slistsList = _.filter(_.values(lists), 'notice');
          });
      });
    }
  },

  data() {
    return {
      tlists: [],
      slistsBanner: [],
      slistsList: []
    };
  }
};
</script>

<style>
.mail {
  background: #fafafa;
}

.banner-show {
  height: 160px;
}

.banner-img {
  margin: 0 auto;
  width: 92%;
  border-radius: 4px;
  height: 160px;
  display: block;
  box-sizing: border-box;
  background-color: #fff;
  pointer-events: none;
}

.stand {
  margin-top: 40px;
}
</style>

