<template>
  <div>
    <ul style="margin-top: 12px">
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带 query 参数，to 的字符串写法【借助绑定及模板字符串】（不推荐） -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{ m.title }}</router-link> -->

        <!-- 跳转路由并携带 query 参数，to 的对象写法（推荐） -->
        <!-- 利用 name 别名 -->
        <router-link
          :to="{
            // path: '/home/message/detail',
            name: 'xiangqing',
            query: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }}
        </router-link>

        <!-- 跳转路由并携带 params 参数（路径形式），to 的字符串写法【借助绑定及模板字符串】（不推荐） -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</router-link> -->

        <!-- 跳转路由并携带 params 参数，to 的对象写法（推荐） -->
        <!-- 特别注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置！-->
        <!-- <router-link
              :to="{
                name: 'xiangqing',
                params: {
                  id: m.id,
                  title: m.title,
                },
              }"
              >{{ m.title }}
            </router-link> -->

        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
  methods: {
    /*
      $router：路由器中（实际是其原型对象上）包含控制路由跳转的API 
      $router.push $router.replace
      其中：$router.push 是压栈、$router.replace 是压栈后替换
    */
    pushShow(m) {
      this.$router
        .push({
          name: "xiangqing",
          query: {
            id: m.id,
            title: m.title,
          },
        })
        .catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
    },
    replaceShow(m) {
      this.$router
        .replace({
          name: "xiangqing",
          query: {
            id: m.id,
            title: m.title,
          },
        })
        .catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
    },
  },
};
</script>
