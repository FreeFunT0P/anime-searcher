import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import VueYouTubeEmbed from 'vue-youtube-embed'

import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import uaLocale from 'element-ui/lib/locale/lang/ua'
import enLang from '@/lang/en'
import ruLang from '@/lang/ru'
import uaLang from '@/lang/ua'


Vue.use(VueAxios, axios)
Vue.use(ElementUI, { locale: ruLocale })
Vue.use(VueYouTubeEmbed)
Vue.use(VueI18n)


Vue.config.productionTip = false

const messages = {
  en: {
    ...enLang,
    ...enLocale,
  },
  ru: {
    ...ruLang,
    ...ruLocale,
  },
  ua: {
    ...uaLang,
    ...uaLocale,
  }
}

const locale = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
const i18n = new VueI18n({ locale, messages })

ElementLocale.i18n((key, value) => i18n.t(key, value))

Vue.prototype.$locale = {
  change(language) {
    i18n.locale = language
  },
  current() {
    return i18n.locale
  },
}

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')