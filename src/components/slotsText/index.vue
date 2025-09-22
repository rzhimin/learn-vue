<template>
  <div class="parent-wrapper">
    <h2>父组件：我来填坑</h2>

    <!-- 引入子组件 -->
    <ChildSlots>
      <!-- 1. 填“默认插槽” -->
      <!-- 语法糖：template 不写 v-slot 默认就是 default -->
      <template>
        <p style="color:royalblue">👋 父组件覆盖了默认插槽</p>
      </template>

      <!-- 2. 填“header”具名插槽 -->
      <!-- v-slot:header 可简写为 #header -->
      <template #header>
        <h3 style="color:orangered">✏️ 父组件定义的 header</h3>
      </template>

      <!-- 3. 填“body”作用域插槽 -->
      <!-- 通过解构拿到子组件抛出的 user 和 counter -->
      <template #body="{ user, counter }">
        <div style="background:#f5f5f5;padding:8px">
          <p>👇 下面数据来自子组件，样式来自父组件</p>
          <p>用户：{{ user.name }} —— 年龄：{{ user.age }}</p>
          <p>计数器：{{ counter }}</p>
          <!-- 父组件里可直接修改子组件数据（通过事件） -->
          <button @click="add(user)">父组件按钮：年龄+1</button>
        </div>
      </template>

      <!-- 4. 填“footer”作用域插槽 -->
      <!-- 只拿 version，演示可单独拿部分数据 -->
      <template #footer="{ version }">
        <footer style="text-align:right;color:#999">
          当前 Vue 版本 —— v{{ version }}
        </footer>
      </template>
    </ChildSlots>
  </div>
</template>

<script>
import ChildSlots from './ChildSlots.vue'

export default {
  name: 'ParentSlots',
  components: { ChildSlots },
  methods: {
    // 父组件想改子组件数据？标准做法：$emit 事件（本文聚焦插槽，故直接改引用）
    // 这里只是为了演示“父拿到子数据后还能玩它”
    add(user) {
      user.age += 1
    }
  }
}
</script>

<style scoped>
.parent-wrapper {
  max-width: 600px;
  margin: 20px auto;
}
</style>