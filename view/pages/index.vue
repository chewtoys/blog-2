<template>
  <div id="home">
    <div class="banner">
      <div>
        <img src="./../assets/images/logo.png" class="logo">
      </div>
      <div class="share">
        <ul>
          <li>
            <a href="https://github.com/e-pan" target="_blank">
              <img src="./../assets/images/icon/github.png" alt="github">
            </a>
          </li>
          <li>
            <a href="https://github.com/e-pan" target="_blank">
              <img src="./../assets/images/icon/github-h.png" alt="github">
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://weibo.com/fzkuo" target="_blank">
              <img src="./../assets/images/icon/weibo.png" alt="微博">
            </a>
          </li>
          <li>
            <a href="https://weibo.com/fzkuo" target="_blank">
              <img src="./../assets/images/icon/weibo-h.png" alt="微博">
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="tencent://message/?uin=121271770&Site=&Menu=yes" target="_blank">
              <img src="./../assets/images/icon/QQ.png" alt="QQ">
            </a>
          </li>
          <li>
            <a href="tencent://message/?uin=121271770&Site=&Menu=yes" target="_blank">
              <img src="./../assets/images/icon/QQ-h.png" alt="QQ">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <Nav></Nav>
    <div class="wrap home">
      <div class="main">
        <section v-for="(item, index) in articles" :key="index" @click="articleDetail(item)">
          <div class="tit">
            <a>{{ item.title }}...</a>
            <em>
              <time class="time">发布时间：{{ item.create_time.substr(0,10) }}</time>
              <span>浏览：{{ item.preview_num > 99 ? '99+' : item.preview_num }}次</span>
              <!-- <span>评论：{{ item.preview_num }}条</span> -->
            </em>
          </div>
          <img :src="item.thumbnail" v-if="item.thumbnail">
          <div class="con" v-html="item.abstract || item.content"></div>
        </section>
        <section class="page">
          <ul>
            <li
              :class="page === currPage ? 'active' : ''"
              @click="handlePage(page)"
              v-for="(page, index) in Math.ceil(articleTotal/5)"
            >{{ page }}</li>
            <li @click="handleMore()">...</li>
          </ul>
        </section>
      </div>
      <aside class="side">
        <article class="tag">
          <h3>分类标签</h3>
          <div>
            <a v-for="(tag, index) in tags" :key="index">{{ tag.name }}</a>
          </div>
        </article>
        <article class="message">
          <h3>最新留言</h3>
          <ul>
            <li v-for="(item, index) in msg" :key="index">
              <!-- <span>{{ item.nick }}：</span> -->
              <em>{{index +1}}：{{ item.content }}</em>
            </li>
          </ul>
        </article>
      </aside>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'
import { axiosAjax } from '~/apis'
import { TDK } from '~/assets/js/e-pan'
console.log('TDK', TDK)

export default {
  async asyncData({ params }) {
    let msg = []
    const messageList = await axiosAjax('/message/list', {
      row: 10,
      pageNum: 1
    })
    if (messageList.code === 200 && messageList.data.items) {
      msg = messageList.data.items
    }
    let tags = []
    const tagList = await axiosAjax('/tag/list', {})
    if (tagList.code === 200) {
      tags = tagList.data.items
    }
    let articles = []
    let articleTotal = 0
    const articleList = await axiosAjax('/article/list', {
      row: 5,
      pageNum: 1
    })
    if (articleList.code === 200) {
      articles = articleList.data.items
      articleTotal = articleList.data.total
    }
    return { msg, tags, articles, articleTotal }
  },
  data() {
    return {
      articles: [],
      currPage: 1
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
  mounted() {
    this.initBanner()
  },
  components: {
    Nav,
    Footer
  },
  methods: {
    initBanner: function() {
      const windowH = window.innerHeight
      const windwoW = document.body.scrollWidth
      document.querySelector('.banner').style.height = windowH + 'px'
    },
    articleDetail(item) {
      this.$router.push('/article/detail?id=' + item.id)
    },
    handleMore() {
      this.$router.push('/article/list')
    },
    handlePage(num) {
      this.currPage = num
      axiosAjax('/article/list', {
        row: 5,
        pageNum: num
      })
        .then(res => {
          console.log(res)
          if (res.code === 200 && res.data.items.length) {
            this.articles = res.data.items
          }
        })
        .catch(e => {})
    }
  }
}
</script>


<style lang="less" scoped>
@import url('./../assets/less/mixin.less');
.page {
  li {
    background: #ddd;
    color: #fff;
    padding: 3px 10px;
    border-radius: 3px;

    &.active {
      background: @main-color;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
