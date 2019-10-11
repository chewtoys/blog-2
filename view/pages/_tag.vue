<template>
  <section>
    <Nav></Nav>
    <div class="home wrap">
      <div class="main">
        <section v-for="(item, index) in itemList" :key="index" @click="articleDetail(item)">
          <div class="tit">
            <a>{{ item.title }}...</a>
            <em>
              <time class="time">发布时间：{{ item.create_time.substr(0,10) }}</time>
              <span>浏览：{{ item.preview_num > 99 ? '99+' : item.preview_num }}次</span>
              <!-- <span>评论：{{ item.preview_num }}条</span> -->
            </em>
          </div>
          <img :src="item.thumbnail" v-if="item.thumbnail" />
          <div class="con" v-html="item.abstract || item.content"></div>
        </section>
        <section class="page">
          <ul>
            <li
              :class="page === currPage ? 'active' : ''"
              @click="handlePage(page)"
              v-for="(page, index) in Math.ceil(dataTotal / 5)"
            >{{ page }}</li>
            <li @click="handleMore()">...</li>
          </ul>
        </section>
      </div>
    </div>
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
    // get hava tag data list
    let dataList = await axiosAjax('/atricle/qryTag', {
      id,
      row: 10,
      pageNum: 1
    })
    let dataTotal = 0,
      itemList = []
    if (dataList.code === 200) {
      itemList = dataList.data.items
      dataTotal = dataList.data.total
    }

    return { itemList, dataTotal }
  },
  data() {
    return {
      currPage: 1
    }
  },
  head() {
    return {
      title: '标签分类 | 前端博客-前端译文-前端资讯',
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
  created() {
    console.log(this.$route.query)
  },
  methods: {
    articleDetail() {}
  }
}
</script>