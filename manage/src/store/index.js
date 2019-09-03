import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types"
console.log(types.TEST_TYPE)

Vue.use(Vuex)

function asyncDate() {
  console.log('asyncDate')
}

const store = new Vuex.Store({
  // 严格模式
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    todoList: [{
      id: 1,
      text: '...',
      done: true
    }, {
      id: 2,
      text: '...',
      done: false
    }, {
      id: 1,
      text: '...',
      done: true
    }, {
      id: 5,
      text: '...',
      done: false
    }]
  },
  // 可以认为是 store 的计算属性
  getters: {
    doneTodos: state => {
      return state.todoList.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => state.todoList.find(todo => todo.id === id),
    // 与上面相等
    // getTodoById: (state) => {
    //   return (id) => {
    //     return state.todoList.find(todo => todo.id === id)
    //   }
    // }
  },
  mutations: {
    increment(state, payload) {
      console.log('payload', payload) // payload页面传递进来的参数,如果体检的是对象则payload表示整个对象 {type: "increment", amount: 100}
      state.count++
    },
    [types.TEST_TYPE](state, payload) {
      console.log('payload', payload)
    },
    getDate(state, payload) {
      console.log(state)
    }
  },
  actions: {
    // increment(context) {
    //   // context 包含 commit dispatch getters rootGetters rootState state
    //   console.log('context', context)
    //   context.commit('increment')
    // },
    // 等同上面代码
    // increment({ commit }) {
    //   commit('increment')
    // }
    // 异步操作
    increment({
      commit,
      dispatch,
      getters,
      rootGetters,
      rootState,
      state
    }, payload) {
      console.log(payload) // 来至组件的参数值
      setTimeout(() => {
        commit('increment', payload)
      }, 1000);
    },
    // 组合
    actionA({
      commit
    }) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          commit('increment')
          res(this.state)
        }, 1000);
      })
    },
    actionB({
      dispatch,
      commit
    }) {
      return dispatch('actionA').then((res) => {
        commit('increment')
      })
    },
    async actionC({
      commit
    }) {
      commit('getDate', await asyncDate())
    },
    async actionD({
      commit
    }) {
      commit('gotData', await asyncDate())
    },
    async actionE({
      dispatch,
      commit
    }) {
      await dispatch('actionD') // 等待 actionD 完成
      commit('gotOtherData', await asyncDate())
    }
  },
  modules: {
    moduleA: {
      // 命名空间
      namespace: true,
      getters: {
        someGetter(state, getters, rootState, rootGetters) {
          getters.someOtherGetter // -> 'moduleA/someOtherGetter'
          rootGetters.someOtherGetter // -> 'someOtherGetter'
        },
        someOtherGetter: state => {
          // ...
        }
      },
      actions: {
        someAaction({
          dispatch,
          commit,
          getters,
          rootGetters
        }) {
          getters.someGetter // -> 'moduleA/someGetter'
          rootGetters.someGetter // -> 'someGetter'

          dispatch('someOtherAction') // -> 'moduleA/someOtherAction'
          dispatch('someOtherAction', null, {
            root: true
          }) // -> 'someOtherAction'

          commit('someMutation') // -> 'moduleA/someMutation'
          commit('someMutation', null, {
            root: true
          }) // -> 'someMutation'
        },
        someOtherAction(ctx, payload) {
          // ...
        }
      }
    }
  }
});

export default store;