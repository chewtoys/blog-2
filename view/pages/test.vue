<template>
  <div>hello, {{ name }}</div>
</template>

<script>
export default {
  // 最重要的一个键, 支持 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
  asyncData(context) {
    return {
      name: 'word'
    }
  },
  // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。详情请参考 关于fetch方法的文档。
  fetch() {},
  // 配置当前页面的 Meta 标签, 详情参考 页面头部配置API。
  head() {},
  // 指定当前页面使用的布局（layouts 根目录下的布局文件）。详情请参考 关于 布局 的文档。
  layout() {},
  // 如果设置为false，则阻止页面自动调用this.$nuxt.$loading.finish()和this.$nuxt.$loading.start(),您可以手动控制它,请看例子,仅适用于在nuxt.config.js中设置loading的情况下。请参考API配置 loading 文档。
  loading() {},
  // 指定页面切换的过渡动效, 详情请参考 页面过渡动效。
  transitions() {},
  // 布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 嵌套路由的应用场景。
  scrollToTop() {},
  // 校验方法用于校验 动态路由的参数。
  validate() {},
  // 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 路由中间件。
  middleware() {}
}
</script>

<style>
.red {
  color: red;
}
</style>
