<template>
  <section id="article-detail">
    <Nav></Nav>
    <section class="wrap article min-box">
      <h2>文章列表</h2>
      <ul>
        <!-- key不推荐用index,使用：key为了在渲染虚拟dom时候减少开销，虚拟dom使用的时diff算法 -->
        <li v-for="(item, index) in articleList" :key="index" @click="handleDetail(item)">
          <!-- <span>{{ index + 1 }}.</span> -->
          <span>{{ item.title }}...</span>
          <span class="time">发布时间：{{ item.create_time }}</span>
        </li>
      </ul>
      <!-- <dl>
        <dd>1</dd>
        <dd>2</dd>
        <dd>3</dd>
        <dd>4</dd>
        <dd>5</dd>
      </dl> -->
    </section>
    <Footer></Footer>
  </section>
</template>

<script>
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'
import { axiosAjax } from '~/apis'

export default {
  async asyncData(context) {
    const { id } = context.query
    let articleList = await axiosAjax('/article/list', {
      row: 10,
      pageNum: 1
    })
    console.log('articleList', articleList)
    if (articleList.code === 200 && articleList.data) {
      articleList = articleList.data.items
    } else {
      articleList = {}
    }
    return { articleList }
  },
  data() {
    return {
      name: '付仲阔博客-你幸福？恩，我姓‘付’。-nuxt版',
      articles: [
        {
          title: 'title',
          createTime: '时间',
          content: '<a>aa</a>',
          img: 'a.jpg'
        }
      ],
      tags: [
        {
          name: '爱好'
        }
      ]
    }
  },
  head() {
    return {
      title: 'title',
      meta: [
        // 为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号。请阅读关于 vue-meta 的更多信息。
        {
          hid: 'hid  hide ',
          name: 'name name',
          conntent: 'content content'
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
    }
  }
}
</script>
