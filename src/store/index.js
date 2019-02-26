import Vue from 'vue'
import Vuex from 'vuex'
import markdownBody from './modules/markdownBody'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        markdownBody
    }
})
