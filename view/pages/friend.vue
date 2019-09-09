<template>
  <section id="friend">
    <Nav></Nav>
    <div class="wrap friend">
      <ul>
        <li>
          <a href>
            <img src="a.jpg">
            <span>链接名称</span>
          </a>
        </li>
      </ul>
      <div>
        <h2>交换友情链接</h2>
        <ul>
          <li>
            <span>
              <i>*</i>链接名称：
            </span>
            <em>
              <input type="text" placeholder="请输入您的链接名称" v-model="friendFrom.websister_name" />
            </em>
          </li>
          <li>
            <span>
              <i>*</i>链接地址：
            </span>
            <em>
              <input type="text" placeholder="请输入您的链接地址" v-model="friendFrom.websister_link" />
            </em>
          </li>
          <li>
            <span>
              <i>*</i>备注：
            </span>
            <em>
              <textarea placeholder="请输入您的备注信息" v-model="friendFrom.content"></textarea>
            </em>
          </li>
          <li>
            <button @click="submit">提交</button>
          </li>
        </ul>
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
        alert('请输入您的链接地址!');
      } else if (!this.friendFrom.websister_name) {
        alert('请输入您的链接名称!');
      } else {
        axiosAjax('/message/add', this.friendFrom).then(res => {

        }).catch(e => {

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
.friend {

}
</style>
