<template>
  <div>
    <!-- state相关 -->
    <!-- <div>{{ count }}</div> -->
    <!-- <div>{{ countAlias }}</div>
    <div>{{ countPlusLocalState }}</div>-->
    <!-- getter相关 -->
    <div>{{ doneTodosCount }}</div>
    <!-- <button @click="handleMutation">handleMutation</button> -->
    <button @click="actionA({c: 1})">handleActionA</button>
    <button @click="actionB">handleActionB</button>
    <button @click="actionC">handleactionC</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      localCount: 100
    };
  },
  methods: {
    handleAction() {
      this.$store.dispatch("increment", { d: 3 });
    },
    handleMutation() {
      console.log(this.$store.state);
      // this.$store.commit("increment", 100);
      // this.$store.commit({
      //   type: 'increment',
      //   amount: 100
      // })
      // this.$store.commit({
      //   type: 'TEST_TYPE',
      //   appid: '123456987'
      // })
    },
    // <button @click="increment({a: 1})">handleMutation</button>
    // 以下代码相当于increment(param) {}
    // ...mapMutations([
    //   'increment'
    // ])
    // 常量的调用
    // ...mapMutations([
    //   'TEST_TYPE'
    // ])
    // 代理别名的调用
    // <button @click="alias({b:2})">handleMutation</button>
    // ...mapMutations({
    //   alias: 'increment'
    // }),
    // ...mapActions(["increment"])
    // ...mapActions(['actionA'])
    actionA() {
      this.$store.dispatch('actionA').then(res => {
        console.log(res)
      })
    },
    actionB() {
      this.$store.dispatch('actionB')
    },
    actionC() {
      this.$store.dispatch('actionC')
    }
  },
  // state相关
  // computed: mapState({
  //   count: state => {
  //     return state.count;
  //   },
  //   countAlias: "count",
  //   countPlusLocalState(state) {
  //     return state.count + this.localCount;
  //   }
  // }),
  // computed: mapState(['count']),
  // computed: {
  //   ...mapState({
  //     // ...
  //   })
  // },
  // getter相关
  computed: mapGetters(["doneTodosCount"]),
  created() {
    // console.log(this.$store.getters.doneTodos)
    // console.log(this.$store.getters.doneTodosCount)
    // console.log(this.$store.getters.getTodoById(5))
  }
};
</script>

<style scoped lang='less'>
// scoped 只能影响当前组件内的样式
* {
  background: #f00;
}
</style>
