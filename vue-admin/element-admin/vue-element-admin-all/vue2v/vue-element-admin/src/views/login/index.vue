<template>
  <div class="login-container">
    <div class="login-logo">
      <div class="login-content">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <!-- <div class="title-container">
            <h3 class="title">
              {{ $t('login.title') }}
            </h3>
            <lang-select class="set-language" />
          </div> -->

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-radio-group v-model="radio" class="radio-checked">
            <el-radio :label="1">防控平台</el-radio>
            <el-radio :label="2">管理平台</el-radio>
          </el-radio-group>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            class="login-btn"
            @click.native.prevent="handleLogin"
          >
            {{ $t('login.logIn') }}
          </el-button>

          <!-- <div style="position:relative">
            <div class="tips">
              <span>{{ $t('login.username') }} : admin</span>
              <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
            </div>
            <div class="tips">
              <span style="margin-right:18px;">
                {{ $t('login.username') }} : editor
              </span>
              <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
            </div>

            <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
              {{ $t('login.thirdparty') }}
            </el-button>
          </div> -->
        </el-form>

        <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
          {{ $t('login.thirdpartyTips') }}
          <br>
          <br>
          <br>
          <social-sign />
        </el-dialog>
      </div>

    </div>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { LangSelect, SocialSign },
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      // 单选框选中
      radio: 1
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          console.log(route)
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log(this.radio)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              if (this.radio === 1) {
                this.redirect = 'page-one'
              } else if (this.radio === 2) {
                this.redirect = 'dashboard'
              }
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      font-size:16px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
      &::-webkit-input-placeholder{
        color:#889aa4;
      }
      &::--moz-placeholder{
        color:#889aa4;
      }
      &:-moz-placeholder{
        color:#889aa4;
      }
      &:-ms-input-placeholder{
        color:#889aa4;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style scoped>
  .radio-checked >>> .el-radio__label{
    color:#fff;
    font-size:16px;
  }
  .radio-checked >>> .el-radio:last-child{
    float:right;
  }
  .login-form >>> .el-form-item__error{
    font-size:16px;
  }
  .login-form >>> .el-form-item__content{
    font-size:18px;
  }
  /* 设置placeholder样式 */
  input::-webkit-input-placeholder{
    color:#889aa4;
  }
  input::-moz-placeholder{
    color:#889aa4;
  }
  input:-moz-placeholder{
    color:#889aa4;
  }
  input:-ms-input-placeholder{
    color:#889aa4;
  }
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  height:100%;
  width: 100%;
  // background-color: $bg;
  background: url(../../assets/login/bg.png);
  background-size:100% 100%;
  overflow: hidden;
  .login-logo{
    background:url(../../assets/login/bgLogo.png) center 30px no-repeat;
    background-size:190px 200px;
    // padding:316px 0 0 0;
    min-height:100%;
    height:100%;
    .login-content{
      height:292px;
      background:url(../../assets/login/ptName.png) 356px center no-repeat rgba(30, 144, 255, 0.2);
      background-size:388px 116px;
      padding:0 382px 0 356px;
      position:absolute;
      top:50%;
      margin-top:-146px;
      width:100%;
      .login-form {
        // position: relative;
        // width: 520px;
        width:364px;
        max-width: 100%;
        // padding: 160px 35px 0;
        // margin: 0 auto;
        float:right;
        overflow: hidden;
        margin:34px 0 0 0;
        .login-btn{
          padding:0;
          height:48px;
          line-height:48px;
          background:#fe8640;
          border-color:#fe8640;
          font-size:24px;
        }
        .radio-checked{
          width:100%;
          height:40px;
          padding:12px 0 0 0;
        }
      }
    }
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

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
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

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
