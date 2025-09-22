<template>
  <div class="child-box">
    <!-- 1. 默认插槽：如果父没给内容，就显示后备内容 -->
    <slot name="default">
      <!-- 后备内容 -->
      <p>这是默认插槽的后备内容</p>
    </slot>

    <!-- 2. 具名插槽：header -->
    <slot name="header">
      <h3>【header 插槽后备】</h3>
    </slot>

    <!-- 3. 作用域插槽：把子组件内部数据抛给父组件 -->
    <!-- 子组件把 user 对象和 counter 数值通过 v-bind 抛出去 -->
    <slot name="body" :user="user" :counter="counter">
      <!-- 后备：父组件不传模板时显示 -->
      <p>用户名：{{ user.name }}，计数：{{ counter }}</p>
    </slot>

    <!-- 4. 再挖一个“footer”作用域插槽，演示多个作用域插槽 -->
    <slot name="footer" :version="version">
      <small>footer 后备：v{{ version }}</small>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ChildSlots',
  data() {
    return {
      // 作用域插槽要抛出去的数据
      user: { id: 1, name: 'Tom', age: 18 },
      counter: 10,
      version: '2.6.14'
    }
  },
  mounted() {
    // 每 1s 自增，方便看父组件拿到的数据是动态响应的
    setInterval(() => this.counter++, 1000)
  }
}
</script>

<style scoped>
.child-box {
  border: 1px dashed #999;
  padding: 12px;
  margin: 8px;
}
</style>