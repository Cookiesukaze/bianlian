<template>
  <div class="navbar grey-border-bottom">
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
      <div class="dropdown">
        <button class="dropbtn">{{ $t('about.name') }}</button>
        <div class="dropdown-content">
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">{{ $t('login') }}</button>
        <div class="dropdown-content">
        </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
    gotoHomePage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.grey-border-bottom{
  border-bottom: 1px solid #e8e8e8;
}
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
</style>
