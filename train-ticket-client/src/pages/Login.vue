<template>
  <div class="login">
    <img src="../assets/railroad-and-train-front-view.png" class="login-logo">
    <h2 class="login-title">欢迎登录</h2>

    <div class="login-box">
      <van-cell-group>
        <van-field v-model="username" clearable label="用户名" right-icon="contact" placeholder="字母、数字或'_'，6-30位" :error-message="nameErrMsg"/>
        <van-field v-model="password" type="password" clearable label="密码" right-icon="edit" placeholder="6-30位" :error-message="pwdErrMsg1"/>
      </van-cell-group>

      <van-button type="primary" class="login-btn" @click="login">登录</van-button>
      <van-button class="register-btn" @click="to_register">注册</van-button>
    </div>

    <van-notice-bar
      mode="closeable"
      text="温馨提示：改订票系统每日06:00～23:00提供服务，在该系统购票、改签、和退票须不晚于开车前30分钟；办理变更到站业务时，请不晚于开车前48小时。"
      left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
    />
  </div>
</template>

<script>
import { Cell, CellGroup, Field, Button, NoticeBar, Toast } from 'vant';
export default {
  name: 'login',

  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast
  },

  data() {
    return {
      username: '',
      password: '',
      nameErrMsg: '',
      pwdErrMsg1: '',
      nameErr: true,
      pwdErr1: true
    };
  },

  methods: {
    login() {
      if (this.isFormLegal()) {
        Toast.loading({
          mask: true,
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '登录中...'
        });

        // // 从api得到数据
        this.$axios
          .post('/users/login', { username: this.username, password: this.password })
          .then(res => res.data)
          .then(data => {
            Toast.clear();
            Toast(data.msg);

            if (data.code === 1) {
              this.$store.dispatch('setUserAction', data.user);
              this.$router.push('/home');
            }
          });
      } else {
        if (!this.username && this.password) {
          Toast.fail('请输入用户名');
        } else if (!this.password && this.username) {
          Toast.fail('请输入密码');
        } else if (!this.password && !this.username) {
          Toast.fail('请输入用户名和密码');
        } else {
          Toast.fail('信息无效');
        }
      }
    },

    to_register() {
      this.$router.push('register');
    },

    // 判断用户名是否含有特俗字符+' ' 除'_'
    checks() {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+]");
      for (var i = 0; i < this.username.length; i++) {
        if (!this.username.substr(i, 1).replace(pattern, '')) {
          return true;
        }
        if (this.username.substr(i, 1) == ' ') {
          return true;
        }
      }
      return false;
    },

    // 判断表单是否填完整
    isFormLegal() {
      return this.username && this.password && this.nameErr == false && this.pwdErr1 == false;
    }
  },

  watch: {
    username() {
      if (this.username.length < 6) {
        this.nameErrMsg = '用户名长度不能小于6！';
        this.nameErr = true;
      } else if (this.username.length > 30) {
        this.nameErrMsg = '用户名长度不能大于30！';
        this.nameErr = true;
      } else if (this.checks()) {
        this.nameErrMsg = '非法字符！';
        this.nameErr = true;
      } else {
        this.nameErrMsg = '';
        this.nameErr = false;
      }
    },

    password() {
      if (this.password.length < 6) {
        this.pwdErrMsg1 = '密码长度不能小于6！';
        this.pwdErr1 = true;
      } else if (this.password.length > 30) {
        this.pwdErrMsg1 = '用户名长度不能大于30！';
        this.pwdErr1 = true;
      } else {
        this.pwdErrMsg1 = '';
        this.pwdErr1 = false;
      }
    }
  }
};
</script>

<style>
.login-logo {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
}

.login-title {
  position: absolute;
  width: 100%;
  top: 32%;
  color: #42b983;
  text-align: center;
}

.login-box {
  position: absolute;
  top: 45%;
  width: 80%;
  margin-left: 10%;
}

.login-box .van-cell-group {
  border: 1px solid #dddddd;
}

.login-btn {
  margin-top: 7%;
  width: 100%;
}

.register-btn {
  margin-top: 7%;
  width: 100%;
  border: 1px solid #dddddd;
}

.van-toast__text {
  text-align: center;
}

.login-box .van-field__label {
  max-width: 70px;
}

.login-box .van-cell__value {
  font-size: 13px;
}
</style>

