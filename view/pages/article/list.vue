<template>
  <section id="article-detail">
    <Nav></Nav>
    <section class="wrap article min-box">
      <h2>文章列表</h2>
      <ul class="list">
        <!-- key不推荐用index,使用：key为了在渲染虚拟dom时候减少开销，虚拟dom使用的时diff算法 -->
        <li v-for="(item, index) in articleList" :key="index" @click="handleDetail(item)">
          <!-- <span>{{ index + 1 }}.</span> -->
          <span>{{ item.title }}...</span>
          <span class="time">发布时间：{{ item.create_time }}</span>
        </li>
      </ul>
      <ul class="page">
        <li
          :class="page === currPage ? 'active' : ''"
          @click="handlePage(page)"
          v-for="(page, index) in Math.ceil(articleTotal/10)"
        >{{ page }}</li>
        <li @click="handleMore()">...</li>
      </ul>
    </section>
    <Footer></Footer>
  </section>
</template>

<script>
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'
import { axiosAjax } from '~/apis'
import { TDK } from '~/assets/js/e-pan'

export default {
  async asyncData(context) {
    const { id } = context.query
    let articleTotal = 0
    let articleList = await axiosAjax('/article/list', {
      row: 10,
      pageNum: 1
    })
    if (articleList.code === 200 && articleList.data) {
      articleTotal = articleList.data.total
      articleList = articleList.data.items
    } else {
      articleList = []
    }
    return { articleList, articleTotal }
  },
  data() {
    return {
      articleList: [],
      currPage: 1,
    }
  },
  head() {
    return {
      title: TDK.title,
      meta: [
        // 为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号。请阅读关于 vue-meta 的更多信息。
        {
          // hid: 'hid  hide ',
          // name: 'name name',
          // conntent: 'content content',
          description: TDK.description
        },
        {
          keywords: TDK.keywords
        }
      ]
    }
  },
  mounted() {},
  components: {
    Nav,
    Footer
  },
  methods: {
    handleDetail(item) {
      console.log(`/article/detail?id=${item.id}`)
      this.$router.push(`/article/detail?id=${item.id}`)
    },
    handleMore() {
      this.$router.push('/article/list')
    },
    handlePage(num) {
      this.currPage = num
      axiosAjax('/article/list', {
        row: 10,
        pageNum: num
      })
        .then(res => {
          console.log(res)
          if (res.code === 200 && res.data.items.length) {
            this.articleList = res.data.items
          }
        })
        .catch(e => {})
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../assets/less/mixin.less');
.article {
  background: #f5f5f5;
  padding: 10px 30px;
  margin: 20px auto;

  h2 {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
  }

  .list {
    li {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px dotted #ddd;
      cursor: pointer;
      padding: 0 20px;

      &:hover {
        background: #fff;
      }

      .time {
        color: #666;
        padding-left: 30px;
        font-size: 12px;
        float: right;
      }
    }
  }
  .page {
    text-align: right;
    margin: 30px 0;
    li {
      background: #ddd;
      color: #fff;
      padding: 3px 10px;
      border-radius: 3px;
      display: inline-block;
      margin-left: 15px;
      cursor: pointer;

      &:hover {
        color: @main-color;
      }
      &.active {
        background: @main-color;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
