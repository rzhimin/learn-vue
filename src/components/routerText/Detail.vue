<template>
  <ul>
    <!-- <li>消息编号：{{ $route.query.id }}</li>
        <li>消息标题：{{ $route.query.title }}</li> -->
    <!-- <li>消息编号：{{ $route.params.id }}</li>
        <li>消息标题：{{ $route.params.title }}</li> -->
    <li>消息编号：{{ id }}</li>
    <li>消息标题：{{ title }}</li>
    <li>a:{{ a }}</li>
    <li>b:{{ b }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id', 'title', 'a', 'b'],
  computed: {
    // 路由的 props 配置，作用：让路由组件更方便地收到参数
    // 其实，用计算属性来封装也可以让路由组件更方便地收到参数，但其实这是本末倒置的，因为计算属性写起来也冗余
    // id() {
    //    return this.$route.query.id;
    // },
    // title() {
    //    return this.$route.query.title;
    // },
  },
  mounted() {
    // this.$route 中存在 query 对象
    console.log(this.$route)
  },
}
</script>
