<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left" :rules="rules">
      <div class="logo">
        <img src="@/assets/common/logo.png" alt="">
      </div>
      <el-form-item prop="loginName">
        <span class="icon">
          <span class="el-icon-mobile-phone" />
        </span>
        <el-input v-model="loginForm.loginName" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="icon">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <span class="icon">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.code" type="text" />
        <span v-if="imgData === '' ? false : true" class="show-pwd" @click="btn">
          <img :src="imgData" alt="">
        </span>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click="login">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { loginCode } from '@/api/login'
import { loginAPI } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      loading: false,
      loginForm: {

        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      imgData: '',
      rules: {
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 获取图片验证码
    async getCode() {
      this.loginForm.clientToken = Math.random()

      try {
        const res = await loginCode(this.loginForm.clientToken)
        console.log(res)
        // const blob = new Blob([res.data], { type: 'image/png' })
        // console.log(blob)
        const url = window.URL.createObjectURL(res.data)
        // 将图片转化为img标签可识别的url
        this.imgData = url
      } catch (error) {
        console.log(1)
      }
    },
    btn() {
      this.getCode()
    },
    async login() {
      try {
        this.loading = true
        const { data } = await loginAPI(this.loginForm)
        console.log(data)

        if (data.msg === '登录成功') {
          this.$store.commit('user/SET_TOKEN', data.token)
          this.$store.commit('user/SET_TOKEN_TIEM', Date.now()) // Date.now()获取当前时间时间戳
          this.$store.commit('user/SET_USER_ID', data.userId)
          this.$router.push({ path: '/home' })
        } else {
          this.loading = false
          this.$message.error(data.msg)
        }
      } finally {
        this.loading = false
      }
    }

  }
}

</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: relative;
  background-image: url('~@/assets/common/background.png') ;
  background-repeat: no-repeat;
  background-size: cover;
  .logo{
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #999;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content{
       background-color: #fff;
    }
  }
}
.el-icon-mobile-phone{
      width: 16px;
      height: 16px;
    }
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: absolute;
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;

  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .icon {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.el-button--primary{
  background-color: #409EFF;
    border-color: #409EFF;
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
}
</style>
