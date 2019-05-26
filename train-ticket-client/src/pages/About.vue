<template>
  <div class="about">
    <van-nav-bar title="我的"/>

    <van-cell value="个人信息"/>

    <van-cell class="son-cell">
      <template slot="title">
        <span class="custom-title">用户名：</span>
        <span class="custom-text">zlxx</span>
        <van-tag plain color="#42b983" class="role-tag">crxx</van-tag>
      </template>
    </van-cell>

    <van-cell class="son-cell">
      <template slot="title">
        <span class="custom-title">手机号：</span>
        <span class="custom-text">zlxx</span>
      </template>
    </van-cell>

    <van-cell class="son-cell">
      <template slot="title">
        <span class="custom-title">邮箱：</span>
        <span class="custom-text">zlxx</span>
      </template>
    </van-cell>

    <van-cell class="son-cell">
      <template slot="title">
        <span class="custom-title">身份证：</span>
        <span class="custom-text">zlxx</span>
      </template>
    </van-cell>

    <van-cell value="帮助" class="parent-cell"/>
    <van-cell class="son-cell" title="出行向导" is-link></van-cell>
    <van-cell class="son-cell" title="温馨服务" is-link></van-cell>
    <van-cell class="son-cell" title="信息服务" is-link></van-cell>

    <van-cell value="其他" class="parent-cell"/>
    <van-cell class="son-cell" title="修改密码" is-link></van-cell>
    <van-cell class="son-cell" title="添加联系人" is-link></van-cell>
    <van-cell class="son-cell" is-link>
      <template slot="title">
        <span class="custom-title">关于</span>
        <van-tag round type="danger">v 2.0</van-tag>
      </template>
    </van-cell>

    <div class="logout-btn-box">
      <van-button class="logout-btn" @click="logout" type="primary">注销</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Tag, Button, Toast } from 'vant';
export default {
  name: 'about',

  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Toast.name]: Toast
  },

  // computed: mapState([
  //   'user'
  // ]),

  data() {
    return {
      columns: ['成人', '儿童', '学生', '残军']
    };
  },

  methods: {
    logout() {
      this.$router.push('login');
      // this.$store.dispatch('deleteUserAction');
      Toast.success('注销成功');
    }
  }
};
</script>

<style>
.about {
  margin-bottom: 20%;
  background-color: #fafafa;
}

.parent-cell {
  margin-top: 5%;
}

.son-cell {
  font-size: 13px;
  color: gray;
}

.custom-title {
  width: 20%;
  display: inline-block;
}

.role-tag {
  margin-left: 10px;
}

.logout-btn-box {
  background-color: white;
}

.logout-btn {
  margin-top: 5%;
  width: 100%;
}
</style>


