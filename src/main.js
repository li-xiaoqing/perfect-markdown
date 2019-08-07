import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import md from '@/utils/md'
Vue.use({
    install(Vue, options) {
        Vue.prototype.$md = md
    }
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
