<template>
  <div>
    <h2>路由测试</h2>
    <div>
      <ul class="nav nav-tabs">
        <!--
          1. replace作用：控制路由跳转时操作浏览器历史记录的模式
          2. 浏览器的历史记录有两种写入方式：分别为 push 和 replace，push 是追加历史记录，replace 是替换当前记录，路由跳转时候默认为 push
            （push 的原理就是将路径依次压栈，当点击浏览器返回上一级按钮时，依次出栈，是先入后出模型）
            （replace 的原理是压栈后直接替换上一次的路径）
          3. 如何开启 replace 模式：<router-link replace .......>News</router-link>
            （开启了 replace 模式的路由页面不能回到上一级，如果上一级路径是 push 的，那么 replace 可以回到上上级）
          4. 应用：用户一开始进入登录页面，当登录成功进入主页后是不能返回上一级登录界面的，所以给登录成功的路由跳转设置为 replace
            -->
        <li>
          <!-- 嵌套路由跳转路径要写完整路径 -->
          <router-link
            class="list-group-item"
            active-class="active"
            to="/routerText/news"
          >
            新闻
          </router-link>
        </li>
        <li>
          <router-link
            class="list-group-item"
            active-class="active"
            to="/routerText/message"
          >
            消息
          </router-link>
        </li>
      </ul>
      <!-- 缓存路由组件：让不展示的路由组件保持挂载，不被销毁 -->
      <!-- 应用：比如组件存在输入框，当用户输入了一些数据还没提交，然后切换了组件，再切回来发现数据全丢了 -->
      <!-- 所以，需要缓存路由组件，即：当路由组件切走之后不要直接销毁 -->

      <!-- 缓存多个路由组件 -->
      <!-- <keep-alive :include="['News', 'Message']"> -->

      <!-- 缓存一个路由组件 -->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouterText",
};
</script>
