<template>
  <div class="search">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft"/>
    <!-- <div class="sr-total">共查询到{{ data.result.length }}趟列车</div> -->
    <ticket-item
      v-for="item in fakedata"
      :key="item.id"
      :id="item.id"
      :startDate="item.startDate"
      :endDate="item.endDate"
      :count="item.count"
      :start="data.map[start]"
      :end="data.map[end]"
    />
  </div>
</template>


<script>
import axios from 'axios';
import { NavBar, Toast } from 'vant';
import TicketItem from '@/components/TicketItem.vue';

export default {
  name: 'search',

  components: {
    [NavBar.name]: NavBar,
    TicketItem,
    [Toast.name]: Toast
  },

  data() {
    return {
      title: '',
      start: '',
      end: '',
      data: {},
      fakedata: [
        { id: 'G1866', startDate: '08:11', endDate: '11:11', count: [22, 12, 34, 2] },
        { id: 'G1226', startDate: '09:11', endDate: '12:11', count: [32, 23, 4, 4] },
        { id: 'K1233', startDate: '09:22', endDate: '12:22', count: [56, 9, 24, 22] },
        { id: 'G6866', startDate: '09:43', endDate: '11:43', count: [17, 67, 65, 14] },
        { id: 'G5866', startDate: '10:11', endDate: '12:11', count: [52, 42, 23, 5] },
        { id: 'K1866', startDate: '08:11', endDate: '11:11', count: [2, 24, 51, 8] },
        { id: 'G9026', startDate: '08:11', endDate: '11:11', count: [92, 54, 24, 19] },
        { id: 'G1236', startDate: '08:11', endDate: '11:11', count: [21, 74, 83, 32] },
        { id: 'G3446', startDate: '08:11', endDate: '11:11', count: [16, 23, 12, 12] }
      ]
    };
  },

  mounted() {
    this.query(this.$route.query.start, this.$route.query.end, this.$route.query.date);
    this.start = this.$route.query.start;
    this.end = this.$route.query.end;
  },

  methods: {
    onClickLeft() {
      this.$router.push('home');
    },

    query(start, end, date) {
      Toast.loading({
        mask: true,
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '查询中...'
      });
      const URL = `${'https://cors-anywhere.herokuapp.com/'}https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=${date}&leftTicketDTO.from_station=${start}&leftTicketDTO.to_station=${end}&purpose_codes=ADULT`;
      axios
        .get(URL)
        .then(res => res.data)
        .then(data => {
          window.console.log(data);
          this.data = data.data;
          this.title = data.data.map[this.start] + ' <> ' + data.data.map[this.end];
          Toast.clear();
        })
        .catch(() => {
          Toast.clear();
        });
    }
  }
};
</script>

<style>
.search .ticket-item:last-child {
  margin-bottom: 20%;
}
</style>

