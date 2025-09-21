<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>老师姓名: {{ $attrs.name }}</h2>
    <h2>老师年龄: {{ age }}</h2>
    <h2>老师性别: {{ sex }}</h2>
    <button @click="updateAge">年龄+1</button>
  </div>
</template> 
<script>
export default {
  name: 'Teacher',
  data() {
    return {
			// 一般不采用下列方式，仅了解
      // 通过 data 数据来接收
      // $attrs 内的属性不会出现在 this 上，所以可以同名（age）
      // 注意，props 与 $attrs 最好不要混用，因为 props 接收了的 $attrs 中就不接收了，$attrs 只接收 props 没有接收完的
      // 如果 props 全部接收了，那 $attrs 里什么也没有，如果 props 一个也没接收，那 $attrs 自动全部接收
      age: this.$attrs.age,
      sex: this.$attrs.sex,
      msg: '老师信息',
    }
  },
  methods: {
    updateAge() {
      // 直接修改 $attrs 的属性是不会有响应式的！
      // this.$attrs.age++;
      // 下面这样也没用！
      // this.$set(this.$attrs, 'age', this.$attrs.age + 1);
      this.age++
    },
  },
}
</script>

<style scoped></style>
