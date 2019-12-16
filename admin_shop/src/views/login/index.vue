<template>
  <div class="login-container">
    <div class="login_welcome">
      <span class="fs_22">欢迎登录</span>
      <span class="fs_13">BACK-STAGE&nbsp;&nbsp;&nbsp;&nbsp;MANAGEMEBT</span>
      <span class="fs_22">零元晋品商家后台管理系统</span>
    </div>
    <div class="formContetn">
      <div class="title">
        <div>Login</div>
        <div>快捷登录</div>
      </div>
      <div class="from_user">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="border">
            <span class="svg-container">
              <svg-icon icon-class="user" />
              <span class="fs_13">账号：</span>
            </span>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入您的用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
          </div>
          <div class="border">
            <span class="svg-container">
              <svg-icon icon-class="password" />
              <span class="fs_13">密码：</span>
            </span>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </div>
          <el-button
            :loading="loading"
            round
            style="width:100%;background:#fbb27a;color:#fff;margin-top:20px;border:none"
            @click.native.prevent="handleLogin"
            >立即登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { loginUser } from "@/api/user.js";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请您输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码最少为6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              if (res.code == 200) {
                this.$router.push({ path: this.redirect || "/" });
              } else {
                this.$message.error(res.msg || "网络出错");
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
// input:-internal-autofill-selected {
//   background: #fff !important;
// }
/* reset element-ui css */
.login-container {
  .el-form-item__content {
    display: flex;
    height: 40px;
    align-items: center;
  }
  .show-pwd {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  .border {
    position: relative;
    padding: 0 10px;
    margin-bottom: 30px;
    display: flex;
    border: 1px solid #cdcdcd;
    border-radius: 20px;
    height: 42px;
  }
  .el-input {
    display: inline-block;
    line-height: 38px;
    // width:;
  }
  .svg-container {
    display: flex;
    align-content: center;
    line-height: 40px;
    .svg-icon {
      margin: auto 10px;
    }
  }
  input {
    background: transparent;
    outline: none;
    border: none;
    color: #000 !important;
    &:-webkit-autofill {
      -webkit-text-fill-color: #000 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.formContetn {
  position: fixed;
  top: 19.53%;
  width: 30%;
  min-width: 350px;
  height: 61.3%;
  left: 53.6%;
  background: url("../../assets/images/size_bg.png") no-repeat;
  background-size: 100% 100%;
  // background-attachment: fixed;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 600;
    margin: 30% 0 10% 0;
    text-align: center;
    color: #3d3d3d;
    display: flex;
    flex-direction: column;
    > div:nth-of-type(1) {
      margin: 2px 0;
      letter-spacing: 5px;
    }
    > div:nth-of-type(2) {
      letter-spacing: 2px;
    }
  }
}
.login_welcome {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  position: fixed;
  left: 20%;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  .fs_13 {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 2px;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  min-width: 800px;
  background: url("../../assets/images/big_bg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .login-form {
    width: 80%;
    margin-left: 10%;
  }
}
</style>
