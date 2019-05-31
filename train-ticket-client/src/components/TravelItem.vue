<template>
  <div class="travel-item" @click="showURL">
    <div class="ti-img">
      <img :src="img">
    </div>
    <div class="ti-info">
      <div>{{title}}</div>
      <div>
        <van-tag color="#42b983">{{start}}</van-tag>
      </div>
      <div>
        <van-tag color="#f2826a">{{price}}¥</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { Tag } from 'vant';
import base64 from 'base-64';

export default {
  name: 'TravelItem',
  components: {
    /* eslint-disable vue/no-unused-components */
    [Tag.name]: Tag
  },
  props: {
    src: String,
    title: String,
    price: String,
    img: String,
    start: String
  },

  methods: {
    showURL() {
      this.$router.push({ name: 'mailitem', params: { id: base64.encode(this.src) } });
    }
  }
};
</script>

<style>
.travel-item {
  width: 88%;
  height: 100px;
  background-color: #fff;
  display: flex;
  margin: 10px auto;
  font-size: 10px;
  border-radius: 4px;
  padding: 6px;
}

.ti-img {
  width: 40%;
  height: 100%;
  text-align: center;
}

.ti-info {
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.ti-info div {
  padding: 3px 0;
}

.ti-img img {
  width: 80%;
  height: 80%;
  margin-top: 10%;
}
</style>
