<template>
  <div>
    <div class="container1">
      <Category title="空"></Category>
      <Category title="美食">
        <!-- 默认插槽：向组件内嵌套下级结构（父 ===> 子）-->
        <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="" />
        <!-- 具名插槽：在组件使用者身上用 slot 指定插槽名称 -->
        <img
          slot="center"
          src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg"
          alt=""
        />
        <a slot="footer" href="http://www.atguigu.com">更多美食</a>
      </Category>

      <Category title="游戏">
        <!-- 默认插槽：向组件内嵌套下级结构（父 ===> 子）-->
        <ul>
          <li v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ul>
        <!-- 具名插槽：在组件使用者身上用 slot 指定插槽名称 -->
        <ul slot="center">
          <li v-for="(g, index) in games" :key="index">{{ g }}x</li>
        </ul>
        <div class="foot" slot="footer">
          <a href="http://www.atguigu.com">单机游戏</a>
          <a href="http://www.atguigu.com">网络游戏</a>
        </div>
        <!--
                    注意：这里是可以将多个标签指定为同一个插槽名称的，并不会覆盖，而是会把具有同一个插槽名称的结构都放入目标插槽中
                    但是，还是建议将需要放入同一个插槽中的结构部分用一个根标签包裹，统一设置插槽名称
                        1、使用 div 包裹
                            （不推荐：破坏了结构）
                            指定插槽名称：slot="插槽名"
                        2、使用 template 包裹
                            （优先推荐）
                            指定插槽名称：slot="插槽名" 或 v-slot:插槽名
    
                    注意！！！！在 Vue 2.6.0 之后，已经废弃了 slot 写法，请一律使用 template 的 v-slot 写法！！！！
                -->
      </Category>

      <Category title="电影">
        <!-- 默认插槽：向组件内嵌套下级结构（父 ===> 子）-->
        <video
          controls
          src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        ></video>
        <!-- 具名插槽：在组件使用者身上用 slot 指定插槽名称 -->
        <video
          slot="center"
          controls
          src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        ></video>
        <template v-slot:footer>
          <div class="foot">
            <a href="http://www.atguigu.com">经典</a>
            <a href="http://www.atguigu.com">热门</a>
            <a href="http://www.atguigu.com">推荐</a>
          </div>
          <h4>欢迎前来观影</h4>
        </template>
      </Category>

      <!-- 由于向组件传递的 html 结构部分是先在调用者身上解析好了，再传递给组件，所以我们的样式通常是可以写到调用者身上的 -->
    </div>
    <!-- 作用域插槽：数据放在在组件的自身上，但根据数据生成的结构需要组件的使用者来决定，这种情况下需要使用作用域插槽 -->
    <!--（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）-->
    <div class="container2">
      <Category title="游戏">
        <!-- 指定了 v-slot 的 template 就能使用作用域插槽 -->
        <!-- 必须给 v-slot 指定一个变量，该变量能够接收作用域插槽中传递过来的值 -->
        <!--（说明：之前作用域插槽使用 slot-scope，但是 Vue2.6.0 之后就改为 v-slot 了）-->
        <template v-slot="games01">
          <ul>
            <li v-for="(g, index) in games01.games" :key="index">{{ g }}</li>
          </ul>
          <h4>{{ games01.msg }}</h4>
        </template>
      </Category>

      <Category title="游戏">
        <!-- 可以使用解构赋值的形式接收 -->
        <template v-slot="{ games }">
          <ol>
            <li v-for="(g, index) in games" :key="index">{{ g }}</li>
          </ol>
        </template>
      </Category>

      <Category title="游戏">
        <!-- 可以使用解构赋值的形式接收 -->
        <template v-slot="{ games, msg }">
          <h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
          <h4>{{ msg }}</h4>
        </template>
      </Category>

      <!--
        一些例子：
        v-slot:demo="slotProps"：既是名为 demo 的具名插槽，还是作用域插槽
        v-slot:default="slotProps"：既是默认插槽（默认插槽，隐含的名字“default”），还是作用域插槽
         -->
    </div>
  </div>
</template>

<script>
import Category from "./components/Category";

export default {
  name: "slotsText",
  components: { Category },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
};
</script>

<style scoped>
.container1,
.container2 {
  display: flex;
  justify-content: space-between;
}
.container2 {
  padding-top: 300px;
}
</style>
