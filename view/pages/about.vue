<template>
  <section id="about">
    <Nav></Nav>
    <div class="wrap about">
      <img
        class="img-head"
        src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erztapC6kiaib8cWYAD6UjPQgs8ib8VZEpbmfONxIccg5U1DxwGx6UTLf5vOqqUOgI61Lgc1V9I1nicCg/0"
      >
      <section>
        <h2>console.log('你幸福？恩，我姓付。')</h2>
        <div>
          <span>性别：男</span>
          <span>出生：1988-08-05</span>
          <span>身高/体重：182cm/67kg</span>
        </div>
        <div>
          <span>电话：18257103327</span>
          <span>e-mail：12127170@qq.com</span>
          <span>爱好：篮球、书法、游戏</span>
          <span>住址：杭州市、江干区</span>
        </div>
        <p></p>
        <p>本人帅的不明显，丑的不突出，游走在2线边缘的工程师；</p>
        <p>已婚已育，出生在辽宁沿海城市，现定居杭州；</p>
        <p>间歇性勤奋，长久性懒惰；</p>
        <p>喜欢书法，高考以艺术生的身份落榜；</p>
        <p>喜欢篮球，虽身高臂长，但体瘦皮薄；</p>
        <p>喜欢游戏，Dota1-Dota2-王者荣耀;</p>
        <p>爱媳妇（求生欲望）、爱工作、爱生活；</p>
        <div class="ERcode">
          <div>
            <img src="./../assets/images/ERcode/wx-ERcode.png">
            <em>撩我</em>
          </div>
          <div>
            <img src="./../assets/images/ERcode/public-ERcode.png">
            <em>我的公众号</em>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </section>
</template>

<script>
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'
import { TDK } from '~/assets/js/e-pan'

export default {
  data() {
    return {}
  },
  head() {
    return {
      title: '关于我 | 你幸福？嗯，我姓“付”',
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
  methods: {},
  created: function() {},
  mounted: function() {},
  filter: function() {}
}
</script>