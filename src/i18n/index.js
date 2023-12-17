import VueI18n from "vue-i18n";
import en from './en.js'
import zh from './zh.js'
import Vue from "vue";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale:'zh',
  messages:{
    en:{
      ...en,
    },
    zh:{
      ...zh,
    },
  }
})
export default i18n;
