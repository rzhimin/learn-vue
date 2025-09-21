// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件
import About from "@/views/About";
import Home from "@/views/Home";
import News from "@/views/News";
import Message from "@/views/Message";
import Detail from "@/views/Detail";
import Base from "@/views/Base";
import ProxyTest from "@/views/ProxyTest";
import MyAnimate from "@/components/myAnimate";
import Test2 from "@/views/Test2";
import ValidateTest from "@/views/ValidateTest";
import Login from "@/views/Login";

// 创建并暴露一个路由器
const router = new VueRouter({
  /*
    1. 对于一个 url 来说，什么是 hash 值？—— `#`及其后面的内容就是 hash 值。
    2. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
    3. hash 模式：
        1. 地址中永远带着`#`号，不美观 。
        2. 若以后将地址通过第三方手机 App 分享，若 App 校验严格，则地址会被标记为不合法。
        3. 兼容性较好。
    4. history 模式：
        1. 地址干净，美观 。
        2. 兼容性和 hash 模式相比略差。
        3. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题（如果 vue 项目部署在 nginx 之类的静态服务器中，也可以对 nginx 配置来解决该问题）
        4. history 在正式上线的项目中应用较多
     */
  // 设置路由为 history 模式
  mode: "history",
  routes: [
    {
      // 利用 name 设置路由名称
      name: "guanyu",
      path: "/about",
      component: About,
      // meta 属性用于标识该路由的元信息
      // 我们可以往 meta 上添加一个 needAuth 属性用于标记该路由是否需要权限校验
      // 注意：needAuth 是我们往 meta 对象上自己添加的，名字随便取，不是原生提供的！
      // 我们也可以往 meta 上添加一个 title 属性，标识路由的标题
      // meta 中还可以添加各种各样的属性，关键看你的业务逻辑……
      // meta: {needAuth: false, title: '关于'}
      // needAuth 为 false，可以直接不写，因为 if 判断中 undefined 会判断为 false
      meta: { title: "关于", },
    },
    {
      name: "zhuye",
      path: "/home",
      component: Home,
      meta: { title: "主页" },
      children: [
        {
          name: "xinwen",
          path: "news",
          component: News,
          // 需要权限校验
          meta: { needAuth: true, title: "新闻" },
          // 独享路由守卫（单独给某一个路由组件设置守卫）
          // 独享路由守卫只有前置没有后置！！！
          beforeEnter: (to, from, next) => {
            console.log("独享路由守卫", to, from);
            if (to.meta.needAuth) {
              // 判断是否需要鉴权
              if (localStorage.getItem("hasAuth")) {
                next();
              } else {
                alert("无权限查看！");
              }
            } else {
              next();
            }
          },
        },
        {
          name: "xiaoxi",
          path: "message",
          component: Message,
          // 需要权限校验
          meta: { needAuth: true, title: "消息" },
          children: [
            {
              // 利用 name 设置路由名称
              name: "xiangqing",
              path: "detail",
              // 跳转路由并携带 params 参数（必须在 path 中先配置好数据占位符）
              // path: "detail/:id/:title",
              component: Detail,
              // 需要权限校验
              meta: { needAuth: true, title: "详情" },
              // 路由的 props 配置，作用：让路由组件更方便地收到参数

              // props 的第一种写法，值为对象，该对象中的所有 key-value 都会以 props 的形式传给 Detail 组件。
              // 这种方法使用较少，因为只能传递死数据。
              // props: {a:1, b:'hello'}

              // props 的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有 params 参数，以 props 的形式传给 Detail 组件。
              // 这种方法使用较少，因为只能收到 params 型参数
              // props: true

              // props 的第三种写法，值为函数（使用较多），该函数返回的对象中每一组 key-value 都会通过 props 传给 Detail 组件
              // props: function () {}
              // 我们可以利用第三种方式实现 query 参数用 props 传递
              // 简写
              props($route) {
                return {
                  // 返回接收到的参数
                  id: $route.query.id,
                  title: $route.query.title,
                  // 也可以返回固定值
                  a: 1,
                  b: "hello",
                };
              },
              // 连续解构赋值简写^^
              // props({ query: { id, title } }) {
              //     return {
              //         // 返回接收到的参数
              //         id,
              //         title,
              //         // 也可以返回固定值
              //         a: 1,
              //         b: 'hello'
              //     };
              // }
            },
          ],
        },
      ],
    },
    {
      path: "/base",
      component: Base,
    },
    {
      path: "/proxyTest",
      component: ProxyTest,
    },
    {
      path: "/myAnimate",
      component: MyAnimate,
    },
    {
      path: "/test2",
      component: Test2,
    },
    {
      path: "/validateTest",
      component: ValidateTest,
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

// 路由守卫：对路由进行权限控制（只有满足一定的条件才能切换路由，例如：管理员才能打开设置界面）
// 在 export default router 之前配置路由守卫

// 全局前置路由守卫 ———— 初始化的时候被调用、每次路由切换之前被调用（对所有路由均有效）
router.beforeEach((to, from, next) => {
  // to 对象包含要去的目的地的信息（fullPath、path、name、meta、params、query 等）
  // from 对象包含初始地的信息（fullPath、path、name、meta、params、query 等）
  // next() 执行放行的函数
  // 有了 to from next() 我们就可以通过代码逻辑对路由的切换进行权限控制，比如：判断 to.path 并执行逻辑、判断 to.name 并执行逻辑等等
  console.log('前置路由守卫', to, from);
  // 判断该路由组件是否需要鉴权（meta.needAuth 属性是否为 true）
  if (to.meta.needAuth) {
    // 判断浏览器 localStorage 是否有：hasAuth: true  *先放行*
    if (localStorage.getItem('hasAuth') || true) {
      // 放行
      next();
    } else {
      alert('无权限查看！');
    }
  } else {
    // 放行（不需要校验权限）
    next();
  }
});

// 全局后置路由守卫 ———— 初始化的时候被调用、每次路由切换成功之后被调用（主要用于设置浏览器选项卡标题）
// 后置路由守卫没有 next()
router.afterEach((to, from) => {
  console.log('后置路由守卫', to, from);
});

export default router;
