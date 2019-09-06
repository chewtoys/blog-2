<template>
  <section id="article-detail" ref="div">
    <Nav></Nav>
    <article class="wrap article-detail min-box">
      <h2>{{ articleDetail.title }}</h2>
      <div v-html="articleDetail.abstract" class="content"></div>
      <div class="tag">
        <span v-if="articleDetail.sourse">来源：{{ articleDetail.sourse }}</span>
        <span v-if="articleDetail.author">作者：{{ articleDetail.author }}</span>
        <span v-if="articleDetail.preview_num">浏览：{{ articleDetail.preview_num }}</span>
        <span v-if="articleDetail.create_time">发布时间：{{ articleDetail.create_time }}</span>
        <span v-if="articleDetail.tag_id">标签：{{ articleDetail.tag_id }}</span>
      </div>
      <div class="img">
        <img :src="articleDetail.thumbnail" />
      </div>
      <div v-html="articleDetail.content" class="content"></div>
    </article>
    <section class="wrap message">
      <h2>留言咨询</h2>
      <ul>
        <li>
          <span>
            <i>*</i>昵称：
          </span>
          <em>
            <input type="text" placeholder="请输入您的昵称" />
          </em>
        </li>
        <li>
          <span>
            <i>*</i>内容：
          </span>
          <em>
            <textarea placeholder="请输入您的内容"></textarea>
          </em>
        </li>
        <li>
          <button>提交</button>
        </li>
      </ul>
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
    let articleDetail = await axiosAjax('/article/detail', {
      id
    })
    if (articleDetail.code === 200 && articleDetail.data) {
      articleDetail = articleDetail.data
    }
    return { articleDetail }
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
      title: this.name,
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
  methods: {}
}
</script>
