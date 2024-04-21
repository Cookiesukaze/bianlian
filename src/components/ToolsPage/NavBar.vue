<template>
  <div class="navbar">
    <div class="logo-img" @click="gotoHomePage" style="cursor:pointer;">
      <img src="https://s11.ax1x.com/2023/12/17/pi5amuT.png" alt="Placeholder Image" />
    </div>
    <div class="nav-links">
      <div class="dropdown">
        <!-- 语言 -->
        <button class="dropbtn">{{ $t('language.name') }}</button>
        <div class="dropdown-content">
          <a @click="changeLanguage('en')">{{ $t('language.en') }}</a>
          <a @click="changeLanguage('zh')">{{ $t('language.zh') }}</a>
        </div>
      </div>
      <div class="dropdown" v-if="!isLoggedIn" @click="toggleLoginCard">
        <button class="dropbtn">{{ $t('login') }}</button>
      </div>
      <div class="dropdown" v-else>
        <button class="dropbtn">{{ username }}</button>
        <div class="dropdown-content">
          <a @click="logout">{{ $t('logout') }}</a>
        </div>
      </div>
    </div>
    <LoginCard v-if="showLoginCard" @login-success="handleLoginSuccess" style="z-index: 999" class="login-card-container"></LoginCard>

  </div>
</template>

<script>


import LoginCard from "@/components/Login/LoginCard.vue";

export default {
  components: {
    LoginCard,
  },
  data() {
    return {
      showLoginCard: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
    gotoHomePage() {
      if (this.$route.path === '/mainpage') {
        location.reload(); // 如果已经在 /mainpage，则刷新页面
      } else {
        this.$router.push('/mainpage'); // 否则跳转到 /mainpage
      }
    },
    scrollToDemo(refName) {
      this.$parent.$refs[refName].$el.scrollIntoView({ behavior: 'smooth' });
    },
    toggleLoginCard() {
      console.log("唤起登录")
      this.showLoginCard = !this.showLoginCard;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
//background-color: #f9f9f9; /* Use the color from OpenAI website */
  padding: 10px 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}
.logo-img img {
  max-width: 150px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: rgba(249, 249, 249, 0);
  color: #333;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
//background-color: #f9f9f9; /* Use the color from OpenAI website */
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
//background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Add styling for other navigation links as needed */
.login-card-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
