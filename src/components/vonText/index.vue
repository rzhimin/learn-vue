<template>
  <div id="app">
    <h3>父组件</h3>

    <!-- 1. 使用 v-on="$listeners" 的子组件 -->
    <!--    直接写 @click / @mouseenter 即可，无需 .native -->
    <MyButton
      useListeners
      @click="onClick1"
      @mouseenter="onEnter1"
      @mouseleave.native="onLeave1"
    >
      有 v-on="$listeners"
    </MyButton>

    <!-- 2. 未使用 v-on="$listeners" 的子组件 -->
    <!--    必须加 .native 才能监听原生事件！ -->
    <MyButton
      :useListeners="false"
      @click.native="onClick2"
      @mouseenter.native="onEnter2"
      @mouseleave="onLeave2"
    >
      无 v-on="$listeners"（需 .native）
    </MyButton>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";

export default {
  name: "Parent",
  components: { MyButton },
  methods: {
    onClick1() {
      console.log("【有$listeners】click 触发");
    },
    onEnter1() {
      console.log("【有$listeners】mouseenter 触发");
    },
    onLeave1() {
      console.log("【有$listeners】mouseleave 触发");
    },
    onClick2() {
      console.log("【无$listeners】click 触发");
    },
    onEnter2() {
      console.log("【无$listeners】mouseenter 触发");
    },
    onLeave2() {
      console.log("【无$listeners】mouseleave 触发");
    },
  },
};
</script>
