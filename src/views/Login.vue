<template>
  <div class="login-wrap">
    <!-- 顶部 Logo -->
    <div class="logo-wrap">
      <i class="el-icon-s-platform logo-icon"></i>
      <span class="logo-text">MyApp</span>
    </div>

    <!-- 登录面板 -->
    <el-card class="login-form" shadow="always">
      <h3 class="title">登录</h3>

      <!-- 登录方式切换 -->
      <div class="change-type-wrap">
        <span
          class="item"
          :class="{ active: loginType === 1 }"
          @click="loginType = 1"
          >账户密码登录</span
        >
        <span
          class="item"
          :class="{ active: loginType === 2 }"
          @click="loginType = 2"
          >手机号登录</span
        >
        <span
          class="under-line"
          :style="{ transform: `translateX(${loginType === 1 ? 40 : 190}px)` }"
        ></span>
      </div>

      <!-- 表单 -->
      <el-form ref="form" :model="form" size="medium" style="margin-top: 24px">
        <!-- 账号密码 -->
        <div class="input-group" v-show="loginType === 1">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="账号"
              prefix-icon="el-icon-user"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              placeholder="密码"
              type="password"
              prefix-icon="el-icon-lock"
              clearable
              show-password
            />
          </el-form-item>
        </div>

        <!-- 手机号验证码 -->
        <div class="input-group" v-show="loginType === 2">
          <el-form-item>
            <el-input
              v-model="form.phone"
              placeholder="手机号"
              prefix-icon="el-icon-phone"
              clearable
              maxlength="11"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.code"
              placeholder="验证码"
              prefix-icon="el-icon-key"
              clearable
              class="code-input"
            >
              <template slot="append">
                <el-button
                  :disabled="countdown < 60"
                  style="width: 130px; text-align: center"
                  @click="sendVerifyCode"
                  >{{ sendCodeText }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>

      <!-- 自动登录 & 忘记密码 -->
      <div class="auto-login-forget">
        <el-checkbox v-model="rememberPassword">自动登录</el-checkbox>
        <el-link type="primary" :underline="false">忘记密码</el-link>
      </div>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        class="login-btn"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </el-button>

      <!-- 注册入口 -->
      <div class="register-text">
        <router-link to="/reg">注册账户</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginType: 1,
      rememberPassword: false,
      loading: false,
      countdown: 60,
      sendCodeText: "获取验证码",
      form: {
        username: "",
        password: "",
        phone: "",
        code: "",
      },
    };
  },
  watch: {
    loginType() {
      this.$refs.form.resetFields();
    },
  },
  methods: {
    sendVerifyCode() {
      if (this.countdown < 60) return;
      const timer = setInterval(() => {
        this.countdown--;
        this.sendCodeText = `${this.countdown}s后重新发送`;
        if (this.countdown === 0) {
          clearInterval(timer);
          this.sendCodeText = "获取验证码";
          this.countdown = 60;
        }
      }, 1000);
    },
    handleLogin() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.success("登录成功（演示）");
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 60vw;
  height: 80vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrap {
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #409eff;
  .logo-icon {
    font-size: 32px;
    margin-right: 8px;
  }
  .logo-text {
    font-weight: 600;
    letter-spacing: 1px;
  }
}

.login-form {
  width: 420px;
  padding: 32px 36px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .title {
    margin: 0 0 24px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }

  .change-type-wrap {
    position: relative;
    display: flex;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    margin-bottom: 8px;
    .item {
      cursor: pointer;
      color: #606266;
      font-size: 14px;
      transition: color 0.3s;
      &.active {
        color: #409eff;
      }
    }
    .under-line {
      position: absolute;
      bottom: 0;
      left: 0px;
      height: 2px;
      width: 80px;
      background: #409eff;
      transition: transform 0.3s;
    }
  }

  .input-group {
    height: 112px; /* 固定高度 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .auto-login-forget {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .login-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
  }

  .register-text {
    text-align: right;
    margin-top: 16px;
    font-size: 14px;
  }
}

@media screen and (max-width: 992px) {
  .login-form {
    width: 90%;
    max-width: 420px;
  }
}
</style>