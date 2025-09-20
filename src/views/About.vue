<template>
  <div>
    <h2>简介的内容</h2>
    <img src="@/assets/logo.png" alt="logo" />
    <h1>欢迎学习vue2</h1>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
  // 组件内路由守卫（只对该组件生效）

  // 通过路由规则，进入该组件时(进入前一刻)被调用
  beforeRouteEnter(to, from, next) {
    console.log("About--beforeRouteEnter", to, from);
    if (to.meta.needAuth) {
      if (localStorage.getItem("hasAuth")) {
        next();
      } else {
        alert("无权限查看！");
      }
    } else {
      next();
    }
  },

  //当一个组件复用时,传递的参数 发生变化就会触发这个钩子函数
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },

  // 通过路由规则，离开该组件时被调用
  // 注意：这个不是后置守卫！！！
  // 后置守卫是指：路由组件切入之后立即调用，而这个 beforeRouteLeave 是路由组件切走的时候(切走前一刻)调用！！！
  beforeRouteLeave(to, from, next) {
    console.log("About--beforeRouteLeave", to, from);
    // 放行
    next();
  },

  // 注意：为什么要强调 “通过路由规则”？
  // 因为：如果直接在模板中写 <About></About> 是不走路由器的，这种就没有通过路由规则
};
</script>
