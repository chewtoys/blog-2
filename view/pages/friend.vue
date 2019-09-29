<template>
  <section class="friend">
    <Nav></Nav>
    <div class="wrap list">
      <ul>
        <li v-for="(item, index) of friendList">
          <a :href="item.link" target="_blank" :title='item.name'>
            <img :src="item.thumbnail" v-if="item.thumbnail" :alt="item.name" :title='item.name'>
            <span v-else>{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="message">
      <div class="wrap">
        <h5>交换友情链接</h5>
        <div>
          <input type="text" placeholder="您的网站名称 *" v-model="friendFrom.websister_name">
          <input type="text" placeholder="您的链接地址 *" v-model="friendFrom.websister_link">
          <textarea placeholder="您的内容 *" v-model="friendFrom.content"></textarea>
          <br>
          <button @click="submit">提交</button>
        </div>
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
    let friendList = await axiosAjax('/friend/list', {})
    if (friendList.code == 200 && friendList.data.total) {
      friendList = friendList.data.items
    }
    return { friendList }
  },
  data() {
    return {
      friendFrom: {
        websister_link: '',
        websister_name: '',
        content: '',
        type: 2
      }
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
  components: {
    Nav,
    Footer
  },
  methods: {
    submit() {
      if (!this.friendFrom.websister_link) {
        alert('请输入您的链接地址!')
      } else if (!this.friendFrom.websister_name) {
        alert('请输入您的链接名称!')
      } else {
        axiosAjax('/message/add', this.friendFrom)
          .then(res => {
            alert('您的消息我已经收到，稍后我会添加到该看板。')
          })
          .catch(e => {
            alert('消息发送失败，您可以前往关于我页面联系我。')
          })
      }
    }
  },
  created: function() {},
  mounted: function() {},
  filter: function() {}
}
</script>

<style lang="less" scoped>
@import url('./../assets/less/mixin.less');
.friend {
  .list {
    padding: 50px 0;
    .clearfix();
    ul {
      clear: both;
      float: left;
    }
    li {
      float: left;
      margin: 0 40px 40px 0;
      width: 200px;
      height: 100px;
    }
    img {
      width: 200px;
      height: 100px;
      background: #ddd;
    }
    span {
      display: block;
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid #ddd;
      color: #999;
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
}
</style>
