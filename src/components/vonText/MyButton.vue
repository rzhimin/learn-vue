<template>
  <!--
    根据父级传来的 useListeners 布尔值，决定要不要把事件透传下去
    这样同一份子组件就能同时演示“用/不用” $listeners 的两种效果
  -->
  <button
    class="my-btn"
    :style="{ background: useListeners ? '#90caf9' : '#ef9a9a' }"
    v-on="useListeners ? $listeners : {}"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    useListeners: {          // 父级控制要不要透传事件
      type: Boolean,
      default: true
    }
  },
  mounted() {
    console.log(this.$listeners)
  },
}
</script>

<style scoped>
.my-btn { padding: 8px 16px; margin: 8px; color: #fff; }
</style>