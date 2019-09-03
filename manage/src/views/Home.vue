<template>
  <div class="home">
    <h1>欢迎访问后台管理系统！</h1>
    <div class="tags">
      <el-tag v-for='(item, index) of tags' :key='index' @click='handleClick(item)'>{{item.name}}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
      {
        name: '首页',
        router: '/'
      },
      {
        name: '标签页',
        router: '/tag/list'
      },
      {
        name: '文章页',
        router: '/article/list'
      },
      {
        name: '留言页',
        router: '/message/list'
      }
    ]
    }
  },
  methods: {
    handleClick(item) {
      this.$router.push(item.router)
    }
  },
  mounted () {
  }
}
</script>


<style lang="less" scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  h1 {
    margin-bottom: 100px;
  }
  .tags {
    display: flex;
    justify-content: space-around;

    span {
      margin: 0 50px;
      cursor: pointer;
    }
  }
}
</style>
