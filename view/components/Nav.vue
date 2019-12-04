<template>
  <nav class="menu" id="menu">
    <div class="logo">
      <a href="/">fuzhongkuo.com</a>
    </div>
    <div class="nav">
      <a v-for="(item, index) in navs" @click="nav(item)">{{ item.text }}</a>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'nav-e',
  data() {
    return {
      navs: [
        {
          text: '网站主页',
          id: 'home',
          router: '/'
        },
        {
          text: '热门文章',
          id: 'article',
          router: '/article/list'
        },
        {
          text: '友情链接',
          id: 'friend',
          router: '/friend'
        },
        {
          text: '关于我',
          id: 'about',
          router: '/about'
        }
        // {
        //   text: '后台管理',
        //   id: 'admin'
        // }
      ]
    }
  },
  methods: {
    nav(item) {
      if (item.id !== 'admin') {
        this.$router.push(item.router)
      } else {
        // window.location.href = 'http://admin.fuzhongkuo.com'
        window.open('http://admin.fuzhongkuo.com')
      }
      // if (item.id != 'admin') {
      //   this.$router.push(item.id)
      // } else {
      //   if (localStorage.getItem('isLogin')) {
      //     this.$router.push(item.id)
      //   } else {
      //     this.$router.push('/login')
      //   }
      // }
    },
    handleScroll() {
      // console.log(document.querySelector('#menu').offsetTop)
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 滚动条偏移量
      if (scrollTop > 100) {
        document.querySelector('#menu').style.position = 'fixed'
      } else {
        document.querySelector('#menu').style.position = 'static'
      }
    }
  },
  mounted() {
    if (this.$route.name !== 'index') {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>