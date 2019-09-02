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
              <span>评论：{{ 2 }}条</span>
            </em>
          </div>
          <img :src="item.thumbnail" v-if="item.thumbnail">
          <p class="con" v-html="item.content"></p>
        </section>
        <section class="page">
          <ul>
            <li v-for="(page, index) in 10">第{{ page }}页</li>
          </ul>
        </section>
      </div>
      <aside class="side">
        <article class="tag">
          <h3>分类标签</h3>
          <div>
            <a v-for="(tag, index) in tags" :key="index">{{ tag.alias }}/{{ tag.name }}</a>
          </div>
        </article>
        <article class="message">
          <h3>最新留言</h3>
          <ul>
            <li v-for="(item, index) in msg" :key="index">
              <span>{{ item.nick }}：</span>
              <em href>{{ item.content }}</em>
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

export default {
  async asyncData({ params }) {
    let msg = [
      {
        nickName: '雨果',
        content:
          '真爱的第一个征兆，在男孩身上是胆怯，在女孩身上是大胆。《悲惨世界》'
      },
      {
        nickName: '狄更斯',
        content:
          '我有个原则：想到要做一件事，就一定要做到，而且要做得彻底。《远大前程》'
      },
      {
        nickName: '玛格丽特·杜拉斯',
        content:
          '那时候，你还很年轻，人人都说你美。现在，我是特意来告诉你，对我来说，我觉得现在你比年轻的时候更美。与你那时的面貌相比，我更爱你现在备受摧残的面容。《情人》'
      },
      {
        nickName: '孔子',
        content: '三人行，必有我师焉，择其善者而从之，其不善者而改之。《论语》'
      },
      {
        nickName: '戴尔·卡耐基',
        content:
          '人不是因为没有信念而失败，而是因为不能把信念化成行动，并且坚持到底。《人性的弱点》'
      },
      {
        nickName: '爱默生',
        content:
          '有两件事我最憎恶：没有信仰的博才多学和充满信仰的愚昧无知。《处世之道·崇拜》'
      },
      {
        nickName: '罗素',
        content:
          '爱情只有当它是自由自在时，才会叶茂花繁。认为爱情是某种义务的思想只能置爱情于死地。只消一句话：你应当爱某个人，就足以使你对这个人恨之入骨。'
      },
      {
        nickName: '雷锋',
        content:
          '钉子有两个长处：一个是“挤”劲，一个是“钻”劲。我们在学习上，也要提倡这种“钉子”精神，善于挤和钻。'
      },
      {
        nickName: '马克·吐温',
        content: '“原则”是“偏见”的另一个名称。'
      },
      {
        nickName: '海明威',
        content: '一个人可以被毁灭，但不能被打败。《老人与海》'
      }
    ]
    const messageList = await axiosAjax('/message/list', {})
    if (messageList.code === 200) {
      msg = messageList.data
    }
    let tags = []
    const tagList = await axiosAjax('/tag/list', {})
    if (tagList.code === 200) {
      tags = tagList.data.items
    }
    let articles = []
    const articleList = await axiosAjax('/article/list', {})
    if (articleList.code === 200) {
      articles = articleList.data.items
    }
    return { msg, tags, articles }
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
      console.log(item)
      this.$router.push('/article/detail?id=' + item.id)
    }
  }
}
</script>
