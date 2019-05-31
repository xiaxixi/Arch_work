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
      <van-field label="证件号码" v-model="id_no" placeholder="用于身份核验，请正确填写" :error-message="idErrMsg" clearable/>
    </van-cell-group>

    <van-cell-group>
      <van-cell class="parent-box parent-cell" value="联系方式"/>
      <van-field label="手机号码" v-model="phone_number" type="tel" placeholder="请准确填写您的手机号" :error-message="pnErrMsg" clearable/>
      <van-field label="电子邮箱" v-model="email" placeholder="请准确填写邮箱地址" :error-message="emailErrMsg" clearable/>
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

    onConfirm(value, index) {
      this.role_value = value;
      this.role = index;
      this.show = false;
    },

    onCancel() {
      this.show = false;
    },

    register() {
      // window.console.log(this.nameErr);
      if (this.isFormLegal()) {
        Toast.loading({
          mask: true,
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '注册中...'
        });

        // 从api得到数据
        this.$axios
          .post('/users/register', {
            username: this.username,
            password: this.password,
            email: this.email,
            phone_number: this.phone_number,
            id_no: this.id_no,
            role: this.role
          })
          // ES6——Arrow Function
          .then(res => res.data)
          .then(data => {
            Toast.clear();
            Toast(data.msg);

            if (data.code === 1) this.$router.push('/login');
          });
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
        this.pwdErr2 == false &&
        this.idErr == false &&
        this.pnErr == false &&
        this.emailErr == false
      );
    },

    // ES6——let命令
    // 判断str是否含有特俗字符+' ' 除'_'
    checks(str) {
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+]");
      for (let i = 0; i < str.length; i++) {
        if (!str.substr(i, 1).replace(pattern, '')) {
          return true;
        }
        if (str.substr(i, 1) == ' ') {
          return true;
        }
      }
      return false;
    },

    // 判断str是否全是数字
    checkStrNUm(str) {
      let numReg = /^[0-9]+$/;
      let numRe = new RegExp(numReg);
      for (let i = 0; i < str.length; i++) {
        if (str.substr(i, 1).replace(numRe, '')) {
          return false;
        }
      }
      return true;
    },

    // 判断身份证是否合法
    checksId() {
      if (this.id_no.length == 18) {
        if (
          this.checkStrNUm(this.id_no.substr(0, 17)) &&
          (this.checkStrNUm(this.id_no.substr(17, 1)) || this.id_no[17] === 'x')
        ) {
          return true;
        }
      }
      return false;
    },

    // 判断手机号码是否合法
    checksPN() {
      if (this.phone_number.length == 11) {
        if (this.checkStrNUm(this.phone_number)) {
          return true;
        }
      }
      return false;
    },

    // 判断电子邮箱是否合法
    checksEmail() {
      let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (re.test(this.email)) {
        return true;
      } else {
        return false;
      }
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
      idErrMsg: '',
      idErr: true,
      phone_number: '',
      pnErrMsg: '',
      pnErr: true,
      email: '',
      emailErrMsg: '',
      emailErr: true,
      role: 0,
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
      } else if (this.checks(this.username)) {
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
    },

    id_no() {
      if (this.checksId()) {
        this.idErrMsg = '';
        this.idErr = false;
      } else {
        this.idErrMsg = '身份证格式错误';
        this.idErr = true;
      }
    },

    phone_number() {
      if (this.checksPN()) {
        this.pnErrMsg = '';
        this.pnErr = false;
      } else {
        this.pnErrMsg = '手机号码格式错误';
        this.pnErr = true;
      }
    },

    email() {
      if (this.checksEmail()) {
        this.emailErrMsg = '';
        this.emailErr = false;
      } else {
        this.emailErrMsg = '邮箱格式错误';
        this.emailErr = true;
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