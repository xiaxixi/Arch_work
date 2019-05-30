<template>
  <div class="ticket-item">
    <div class="ti-row">
      <div class="col-id">{{id}}</div>
      <div class="col-start">
        <van-tag color="#42b983">始</van-tag>
        {{start}}
      </div>
      <div class="col-hr">--------</div>
      <div class="col-end">
        <van-tag type="danger">终</van-tag>
        {{end}}
      </div>
    </div>

    <div class="ti-row">
      <div class="col-id"></div>
      <div class="col-startDate">{{startDate}}</div>
      <div class="col-hr"></div>
      <div class="col-endDate">{{endDate}}</div>
    </div>

    <div class="ti-row">
      <div class="col-seat">商务：{{count[0]}}</div>
      <div class="col-seat">一等：{{count[1]}}</div>
      <div class="col-seat">二等：{{count[2]}}</div>
      <div class="col-seat">无座：{{count[3]}}</div>
    </div>
  </div>
</template>

<script>
import { Tag } from 'vant';

export default {
  name: 'TicketItem',
  components: {
    /* eslint-disable vue/no-unused-components */
    [Tag.name]: Tag
  },
  props: {
    id: String,
    start: String,
    end: String,
    startDate: String,
    endDate: String,
    count: Array
  }
};
</script>

<style>
.ticket-item {
  border-bottom: 1px dashed #ddd;
}

.ti-row {
  display: flex;
  margin: 5px 0;
  font-size: 13px;
}

.col-id {
  width: 20%;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}

.col-start,
.col-end {
  width: 30%;
  text-align: center;
}

.col-hr {
  width: 20%;
  text-align: center;
}

.col-seat {
  width: 25%;
  text-align: center;
}

.col-startDate,
.col-endDate {
  width: 30%;
  text-align: center;
}
</style>
