<template>
  <div>
    router param
    {{ $route.params.id }}
    <router-link to='/'>home</router-link>
    <span @click="changeRouter">changeRouter</span>
  </div>
</template>

<script>
export default {
  props: {
    id: "" // 来自路由的id
  },
  data() {
    return {};
  },
  watch: {
    '$route': 'getData'
  },
  created() {
    // console.log(this.$route.params.id);
    console.log(this.id);
  },
  // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    getData() {
      console.log('getdata')
    },
    changeRouter() {
      this.id++
      this.$router.push(`/routerParam/${this.id}`)
    }
  }
};
</script>
