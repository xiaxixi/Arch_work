<template>
  <div class="home">
    <van-nav-bar title="首页"/>
    <h3 class="h-title">车票查询</h3>

    <div class="station-box">
      <van-button class="son-box" @click="startshow = true" size="normal">{{ startValue }}</van-button>
      <van-popup v-model="startshow" position="bottom" :overlay="true">
        <van-picker show-toolbar :columns="columns" @confirm="onStartConfirm" @cancel="onCancel"/>
      </van-popup>

      <van-icon name="exchange" size="30px" color="#42b983" @click="onExchange"/>

      <van-button class="son-box" @click="endshow = true" size="normal">{{ endValue }}</van-button>
      <van-popup v-model="endshow" position="bottom" :overlay="true">
        <van-picker show-toolbar :columns="columns" @confirm="onEndConfirm" @cancel="onCancel"/>
      </van-popup>
    </div>

    <div class="date-box">
      <p>出发日期</p>
      <datepicker class="date-picker" format="yyyy-MM-dd" placeholder="请选择出发日期" v-model="date" :disabledDates="disabledDates"></datepicker>
    </div>

    <van-button class="search-btn" @click="onSearch" plain hairline type="primary">查询车票</van-button>
  </div>
</template>

<script>
import { NavBar, Picker, Button, Popup, Icon, Toast } from 'vant';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'Home',

  components: {
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    Datepicker,
    [Toast.name]: Toast
  },

  data() {
    return {
      startshow: false,
      startValue: '起始站',
      endshow: false,
      endValue: '终点站',
      tmp: '',
      date: '',
      disabledDates: {
        to: new Date()
      },
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },

  methods: {
    onChange(picker, value, index) {
      window.console.log(`当前值：${value}, 当前索引：${index}`);
    },

    onStartConfirm(value) {
      this.startValue = value;
      this.startshow = false;
    },

    onEndConfirm(value) {
      this.endValue = value;
      this.endshow = false;
    },

    onCancel() {
      this.startshow = false;
      this.endshow = false;
    },

    onExchange() {
      this.tmp = this.startValue;
      this.startValue = this.endValue;
      this.endValue = this.tmp;
      if (this.startValue === '起始站' || this.startValue === '终点站') this.startValue = '起始站';
      if (this.endValue === '起始站' || this.endValue === '终点站') this.endValue = '终点站';
    },

    onSearch() {
      if (this.startValue !== '起始站' && this.endValue !== '终点站' && this.startValue !== this.endValue && this.date) {
        this.$router.push({
          name: 'search'
          // name: 'search',
          // query: { start: this.startValue, end: this.endValue, date: this.date.toISOString().slice(0, 10) }
        });
      } else {
        Toast.fail('信息无效');
      }
    }
  }
};
</script>

<style>
.van-nav-bar {
  background-color: #42b983;
}

.van-nav-bar__title {
  color: white;
}

.h-title {
  text-align: center;
  color: #42b983;
  font-weight: normal;
}

.station-box {
  display: flex;
  margin-top: 10%;
  justify-content: center;
}

.son-box {
  width: 20%;
}

.station-box .van-icon {
  width: 15%;
  line-height: 44px;
  text-align: center;
}

.date-box {
  display: flex;
  width: 55%;
  margin: auto;
  margin-top: 10%;
  justify-content: center;
  font-size: 14px;
}

.date-box p {
  width: 40%;
  text-align: center;
  line-height: 100%;
}

.date-picker {
  width: 60%;
}

.date-picker input {
  width: 100%;
  padding: 10% 0 10% 10%;
  border: 1px solid #ebedf0;
}

.vdp-datepicker__calendar {
  position: relative;
  left: -100%;
}

.search-btn {
  position: relative;
  margin-top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>

