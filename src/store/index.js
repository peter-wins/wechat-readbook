import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import detail from './modules/detail'
import getters from './getters'
import actions from './actions'

// 安装vuex插件
Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
  state: {},
  mutations: {

  },
  actions,
  getters,
  modules: {
    book,
    detail
  }
})

// 导出store
export default store
