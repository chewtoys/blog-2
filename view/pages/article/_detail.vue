<template>
  <section id="article-detail" ref="div">
    <Nav></Nav>
    <article class="wrap article-detail min-box">
      <h2>{{ articleDetail.title }}</h2>
      <div v-if="articleDetail.abstract" class="abstract">{{articleDetail.abstract}}</div>
      <div class="tag">
        <span v-if="articleDetail.sourse && articleDetail.sourse != 'undefined'">
          来源：
          <a :href="articleDetail.sourse" target="_blank">{{ articleDetail.sourse }}</a>
        </span>
        <span v-if="articleDetail.author">作者：{{ articleDetail.author }}</span>
        <span v-if="articleDetail.preview_num">浏览：{{ articleDetail.preview_num }}</span>
        <span v-if="articleDetail.create_time">发布时间：{{ articleDetail.create_time }}</span>
        <span v-if="articleDetail.tag_id">
          标签：
          <em
            v-for="(item, index) of articleDetail.tagName"
            @click="handleTag(item)"
          >{{item.name}}</em>
        </span>
      </div>
      <div class="img">
        <img :src="articleDetail.thumbnail" />
      </div>
      <div v-html="articleDetail.content" class="content"></div>
    </article>
    <div class="message">
      <section class="wrap">
        <h5 v-if="messgaeRecord.length">评论记录</h5>
        <ul class="record" v-if="messgaeRecord.length">
          <li v-for="(item, index) of messgaeRecord">
            <em>{{item.nick}}：</em>
            <span>{{item.content}}</span>
          </li>
        </ul>
        <ul v-if="messgaeRecord.length" class="page">
          <li v-for="(item, index) of Math.ceil(messgaeRecord.length/10)">{{index+1}}</li>
        </ul>
        <h5>留言咨询</h5>
        <div>
          <input type="text" placeholder="您的昵称 *" v-model="messageFrom.nick" />
          <input type="text" placeholder="您的联系方式 *" v-model="messageFrom.contact" />
          <textarea placeholder="您的内容 *" v-model="messageFrom.content"></textarea>
          <br />
          <button @click="submit">提交</button>
        </div>
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
      const tagIds = articleDetail.tag_id.split(',')
      if (tagIds.length) {
        articleDetail.tagIds = tagIds
        let tagList = await axiosAjax('/tag/list', {
          row: 999,
          pageNum: 1
        })
        if (tagList.code === 200 && tagList.data.total) {
          let tagName = []
          tagIds.forEach(id => {
            tagList.data.items.forEach(list => {
              if (id == list.id) {
                tagName.push(list)
              }
            })
          })
          articleDetail.tagName = tagName
        }
      }
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
      title: this.articleDetail.title + ' 前端博客-前端译文-前端资讯',
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
    handleTag(tag) {
      this.$router.push(`/tag?id=${tag.id}`)
    },
    submit() {
      if (!this.messageFrom.nick) {
        alert('昵称不能为空')
      } else if (!this.messageFrom.content) {
        alert('留言内容不能为空')
      } else {
        this.messageFrom.article_id = this.$route.query.id
        axiosAjax('/message/add', this.messageFrom)
          .then(res => {
            // alert('您的消息我已经收到，稍后我会添加到该看板。')
            alert('评论成功。')
          })
          .catch(e => {
            alert('消息发送失败，您可以前往关于我页面联系我。')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.abstract {
  border: 1px dashed #ddd;
  padding: 10px 20px;
  text-indent: 2em;
  border-radius: 3px;
  margin-bottom: 20px;
}
.tag {
  text-align: right;
  em {
    color: #825cff;
    cursor: pointer;
    padding-right: 7px;
    font-size: 12px;
  }
}
.message {
  background: #f6f6f6;
  border-bottom: 1px solid #fff;
  padding-bottom: 40px;

  h5 {
    font-size: 15px;
    line-height: 1.571428571428571em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    padding: 30px 0;
  }
  .record {
    width: 820px;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      em {
        color: #825cff;
      }
    }
  }
  .page {
    width: 820px;
    margin-top: 20px;

    li {
      background: #fff;
      display: inline-block;
      padding: 5px 12px;
      border-radius: 3px;
      cursor: pointer;
    }
  }

  input {
    width: 400px;
    background: #fff;
    border: 0;
    font-size: 13px;
    line-height: 30px;
    height: 30px;
    padding: 20px 12px;
    margin: 0 20px 20px 0;
    float: left;
  }
  textarea {
    width: 820px;
    background: #fff;
    border: 0;
    padding: 15px 12px;
    outline: none;
    font-size: 13px;
    margin-bottom: 20px;
  }
  button {
    position: relative;
    display: inline-block;
    width: auto;
    height: 39px;
    line-height: 39px;
    margin: 0;
    padding: 0 23px;
    border: 2px solid #303030;
    font-size: 13px;
    font-weight: 700;
    font-family: inherit;
    text-align: left;
    color: #303030;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    -o-border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    -ms-border-radius: 4px;
    border-radius: 4px;
    text-shadow: none;
    background-color: transparent;
    -webkit-transition: color 0.1s linear, background-color 0.1s linear,
      border-color 0.1s linear;
    -moz-transition: color 0.1s linear, background-color 0.1s linear,
      border-color 0.1s linear;
    -ms-transition: color 0.1s linear, background-color 0.1s linear,
      border-color 0.1s linear;
    -o-transition: color 0.1s linear, background-color 0.1s linear,
      border-color 0.1s linear;
    transition: color 0.1s linear, background-color 0.1s linear,
      border-color 0.1s linear;
    -webkit-box-sizing: initial !important;
    -moz-box-sizing: initial !important;
    box-sizing: initial !important;
  }
}
</style>
