<template>
  <div>
    <div class="overlay" v-if="showModal"></div>
    <div class="login-card" v-if="showModal">
      <div class="title">登录</div>
      <div class="login-form">
        <input type="text" placeholder="手机号" v-model="username" style="margin-top: 0.5rem;"/>
        <div class="input-group">
          <input type="password" placeholder="短信验证码" v-model="password" style="margin-top: 0.5rem;width: 12rem"/>
          <button @click="sendCode" style="background:#1E90FF;color:#fff;margin-top: 0.5rem;margin-left: 0.6rem;width: 9rem;height: 100%">{{ sendingButtonText }}</button>
        </div>
        <button @click="login" style="margin-top: 1rem;">登录 / 注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false,
      showModal: true,
      isSendingCode: false,
      countDown: 0
    }
  },
  computed: {
    sendingButtonText() {
      return this.countDown > 0 ? `重新发送(${this.countDown}s)` : '发送验证码'
    }
  },
  methods: {
    login() {
      console.log('登录', this.username, this.password)
      // TODO: 发送请求
      setTimeout(() => {
        this.isLoggedIn = true
        this.showModal = false
        console.log('模拟登录成功')
        this.$emit('login-success', {}) // 假设登录成功后的用户信息为空对象
      }, 500)
    },
    sendCode() {
      if (this.isSendingCode || this.countDown > 0) return
      console.log('发送验证码给', this.username)
      this.isSendingCode = true
      this.countDown = 60
      const intervalId = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          clearInterval(intervalId)
          this.isSendingCode = false
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1px);
  z-index: 999;
}
.login-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 5px 15px 0 rgba(30, 144, 255, 0.4);
  padding: 30px;
  width: 400px;
  height: 330px;
  z-index: 1000;
  margin: 0;
}

.login-card .title {
  text-align: center;
  font-size: 24px;
  color: #1E90FF;
  margin-bottom: 20px;
}

.login-card .login-form {
  display: flex;
  flex-direction: column;
}

.login-card .login-form input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #1E90FF;
  border-radius: 0.5rem;
}

.login-card .login-form input:focus {
  outline: none;
  border-color: #1E90FF;
}

.login-card .login-form button {
  padding: 10px;
  border: none;
  border-radius: 0.5rem;
  background-color: #1E90FF;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-card .login-form button:hover {
  background-color: #1874CD;
}

.login-card .login-form button:focus {
  outline: none;
}
</style>
