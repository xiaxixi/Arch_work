<template>
  <div class="register">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft"/>
    <van-cell-group>
      <van-cell class="parent-box" value="基本信息"/>
      <van-field label="用户名" v-model="username" placeholder="字母、数字或'_'，6-30位" :error-message="nameErrMsg" clearable/>
      <van-field label="密码" v-model="password" type="password" placeholder="6-30位" :error-message="pwdErrMsg1" clearable/>
      <van-field label="确认密码" v-model="checkpassword" type="password" placeholder="请再次输入密码" :error-message="pwdErrMsg2" clearable/>
    </van-cell-group>

    <van-cell-group>
      <van-cell class="parent-box parent-cell" value="详细信息"/>
      <van-field label="证件类型" value="中国居民身份证" readonly/>
      <van-field label="证件号码" v-model="id_no" placeholder="用于身份核验，请正确填写" clearable/>
    </van-cell-group>

    <van-cell-group>
      <van-cell class="parent-box parent-cell" value="联系方式"/>
      <van-field label="手机号码" v-model="phone_number" type="tel" placeholder="请准确填写您的手机号" clearable/>
      <van-field label="电子邮箱" v-model="email" placeholder="请准确填写邮箱地址" clearable/>
    </van-cell-group>

    <van-cell-group>
      <van-cell class="parent-box parent-cell" value="附加信息"/>
      <van-field label="旅客类型" v-model="role_value" @focus="show = true" readonly>
        <van-popup position="bottom" v-model="show" slot="button">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
        </van-popup>
      </van-field>
    </van-cell-group>

    <van-button class="register-btn" type="primary" @click="register">注册</van-button>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Field, Button, Popup, Picker, Toast } from 'vant';

export default {
  name: 'register',

  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast
  },

  methods: {
    onClickLeft() {
      this.$router.push('login');
    },

    onConfirm(value) {
      this.role_value = value;
      this.show = false;
    },

    onCancel() {
      this.show = false;
    },

    register() {
      window.console.log(this.nameErr);
      if (this.isFormLegal()) {
        Toast.loading({
          mask: true,
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '注册中...'
        });

        //后端：axios添加注册代码
        Toast.clear();
        this.$router.push('login');
      } else {
        Toast.fail('无效信息！');
      }
    },

    // 判断表单是否填完整
    isFormLegal() {
      return (
        this.username &&
        this.password &&
        this.checkpassword &&
        this.email &&
        this.phone_number &&
        this.id_no &&
        this.password == this.checkpassword &&
        this.nameErr == false &&
        this.pwdErr1 == false &&
        this.pwdErr2 == false
      );
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
    }
  },

  data() {
    return {
      username: '',
      password: '',
      checkpassword: '',
      pwdErrMsg1: '',
      pwdErrMsg2: '',
      nameErrMsg: '',
      nameErr: true,
      pwdErr1: true,
      pwdErr2: true,
      id_no: '',
      phone_number: '',
      email: '',
      role_value: '成人',
      show: false,
      columns: ['成人', '儿童', '学生', '残军']
    };
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
    },

    checkpassword() {
      if (this.checkpassword !== this.password) {
        this.pwdErrMsg2 = '两次密码不一致！';
        this.pwdErr2 = true;
      } else {
        this.pwdErrMsg2 = '';
        this.pwdErr2 = false;
      }
    }
  }
};
</script>

<style>
.van-nav-bar .van-icon {
  color: white;
}

.register {
  background-color: #fafafa;
}

.register .parent-box {
  border-bottom: 1px solid #ebedf0;
}
.register .parent-box:not(:last-child)::after {
  border: none;
}

.register .van-field {
  font-size: 13px;
  color: #5f6266;
}

.register .van-field__control {
  color: #5f6266;
}

.register-btn {
  margin-bottom: 5%;
}
</style>

