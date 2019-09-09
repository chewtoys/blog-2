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
        <img :src="articleDetail.thumbnail">
      </div>
      <div v-html="articleDetail.content" class="content"></div>
    </article>
    <div class="message">
      <section class="wrap">
        <h2>评论记录</h2>
        <!-- {{messgaeRecord}} -->
        <ul class="record">
          <li v-for="(item, index) of messgaeRecord">
            <em>{{item.nick}}：</em>
            <span>{{item.content}}</span>
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) of Math.ceil(messgaeRecord.length/10)">第{{index+1}}页</li>
        </ul>
        <h2>留言咨询</h2>
        <ul>
          <li>
            <span>
              <i>*</i>昵称：
            </span>
            <em>
              <input type="text" placeholder="请输入您的昵称" v-model="messageFrom.nick" />
            </em>
          </li>
          <li>
            <span>
              <i>*</i>内容：
            </span>
            <em>
              <textarea placeholder="请输入您的内容" v-model="messageFrom.content"></textarea>
            </em>
          </li>
          <li>
            <button @click="submit">提交</button>
          </li>
        </ul>
      </section>
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
    let articleDetail = await axiosAjax('/article/detail', {
      id
    })
    if (articleDetail.code === 200 && articleDetail.data) {
      articleDetail = articleDetail.data
    }

    let messgaeList = await axiosAjax('/message/list', {
      article_id: id,
      row: 10,
      pageNum: 1
    })
    let messgaeRecord = []
    if (messgaeList.code === 200 && messgaeList.data.total) {
      messgaeRecord = messgaeList.data.items
    }

    return { articleDetail, messgaeRecord }
  },
  data() {
    return {
      messageFrom: {
        nick: '',
        content: '',
        type: 1
      }
    }
  },
  head() {
    return {
      title: this.articleDetail.title || TDK.title,
      meta: [
        // 为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号。请阅读关于 vue-meta 的更多信息。
        {
          // hid: 'hid  hide ',
          // name: 'name name',
          // conntent: 'content content',
          description: this.articleDetail.abstract || TDK.description
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
    submit() {
      if (!this.messageFrom.nick) {
        alert('昵称不能为空');
      } else if (!this.messageFrom.content) {
        alert('留言内容不能为空');
      } else {
        this.messageFrom.article_id = this.$route.query.id
        axiosAjax('/message/add', this.messageFrom).then(res => {

        }).catch(e => {

        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.message {
  background: #ddd;

  h2 {
    font-size: 20px;
    padding: 20px 0 10px 0;
  }
}
</style>
