<!-- 每个 .vue 文件就是一个 Vue 组件 -->
<!-- 其文件名必须与组件名称对应 -->
<!-- <template>、<script>、<style> 三者单独存在于组件文件中（单文件组件） -->

<template>
  <!-- vue2.0 必须有一个根标签包裹 -->
  <div class="row">
    <Banner />
    <div class="col-xs-2 col-xs-offset-1">
      <div class="list-group">
        <!-- 路由的切换 -->
        <!-- 利用 name 别名（此处不建议这么写，因为路径只有一级没必要依靠别名） -->
        <router-link
          class="list-group-item"
          active-class="active"
          :to="{ name: 'guanyu' }"
        >
          About
        </router-link>
        <router-link class="list-group-item" active-class="active" to="/home">
          Home
        </router-link>
      </div>
    </div>
    <div class="col-xs-8">
      <div class="panel">
        <div class="panel-body">
          <!-- 路由组件,指定组件的呈现位置 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import Banner from "@/views/Banner";

export default {
  name: "App",
  components: {
    Banner,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<!--// 子组件中的样式最终都是合并到一块的！
    // 如果样式不加 scoped，那么同名的样式选择器，后引入的会覆盖前引入的！
    // 注意：和配置项中 components 的顺序无关，和 import 的顺序有关！ -->
<!-- 在 APP 组件中，一般不需要加 scoped，因为一般 APP 中的样式都是全局的，其它组件一般也应该接受 -->
<!-- 当 APP 组件样式与其它组件样式冲突时，其它组件样式优先级更高！ -->
<style></style>
