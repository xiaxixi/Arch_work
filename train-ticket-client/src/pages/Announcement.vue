<template>
  <div class="announcement">
    <van-nav-bar title="公告"/>
    <van-cell-group class="announcement-group">
      <van-cell v-for="(item, index) in announcements" :key="index" :title="item.title" :value="item.date" @click="showURL(index)" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import { Button, NavBar, Cell, CellGroup } from 'vant';
import base64 from 'base-64';

export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },

  methods: {
    getAnnouncements() {
      fetch('https://www.12306.cn/index/otn/index12306/getNews').then(response => {
        response
          .json()
          .then(data => data.data.index_news_list)
          .then(news => {
            this.announcements = news;
          });
      });
    },

    showURL(idx) {
      this.$router.push({ name: 'announcementitem', params: { id: base64.encode(this.announcements[idx].src) } });
    }
  },

  data() {
    return {
      announcements: []
    };
  },

  mounted() {
    this.getAnnouncements();
  }
};
</script>

<style>
.announcement-group {
  margin-bottom: 60px;
}

.announcement-group .van-cell {
  font-size: 12px;
}

.announcement-group .van-cell__title {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 24px;
  white-space: nowrap;
  height: 24px;
  flex: 2;
}
</style>
