<!-- 每个 .vue 文件就是一个 Vue 组件 -->
<!-- 其文件名必须与组件名称对应 -->
<!-- template 不再写在配置对象中，而是写在 <template> 中 -->
<!-- <template>、<script>、<style> 三者单独存在于组件文件中（单文件组件） -->

<template>
  <!-- vue2.0 必须有一个根标签包裹 -->
  <div>
    <div class="test1">
      <!-- assets：静态资源文件夹 -->
      <img src="./assets/logo.png" alt="logo" />
      <!-- ref 属性： -->
      <!-- 1. 被用来给元素或子组件注册引用信息（id 的替代者） -->
      <!-- 2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc） -->
      <!-- 3. 使用方式： -->
        <!-- 1. 打标识：<h1 ref="xxx">.....</h1> 或 <TheSchool ref="xxx"></TheSchool> -->
        <!-- 2. 获取：this.$refs.xxx -->
      <h1 ref="title" class="title" v-text="msg"></h1>
      <button ref="btn" @click="showDOM">点我输出上方的 DOM 元素</button>
      <TheSchool ref="sch" id="sch"></TheSchool>
      <!-- 父组件可以在调用子组件时传递值给子组件，在子组件内用 props 配置项接收 -->
      <!--
        不加冒号，那么默认传递的都是字符串格式，
        加了冒号那么就是绑定值（其类型及值便是引号内部表达式的计算值）
      -->
      <Student name="小美" :sex="female" :age="18" />
      <Teacher name="语文老师" :sex="male" :age="50" />
    </div>
    
    <todoList></todoList>
    <div className="test2">
          <h1>{{ msg }}，学生姓名是：{{ studentName }}</h1>

          <!-- 通过父组件给子组件传递函数类型的 props 实现：子给父传递数据（之前的方式） -->
          <TheSchool :getSchoolName="getSchoolName" />

          <!-- 组件自定义事件：给组件绑的事件！（之前我们学的 Vue 事件是给 HTML（DOM）元素绑的） -->
          <!-- 主要作用：实现子组件给父组件传递数据！ -->
          <!-- 原理：通过父组件给子组件绑定一个自定义事件，事件的回调在父组件中 -->
          <!-- 组件自定义事件触发方式：到该组件的实例对象中进行触发，触发时就会调用父组件中定义的回调函数 -->

          <!--（第一种写法，使用 @ 或 v-on）-->
          <!-- 给 Student 组件的实例对象 vc 上绑定 atguigu 事件 -->
          <Student @atguigu="getStudentName" />
          <!-- 绑定自定义事件（一次性）：@atguigu.once="getStudentName" -->

          <!--（第二种写法，使用 ref）-->
          <!-- 在组件标签上加上 ref 属性 -->
          <!-- 定义格式：this.$refs.xxx.$on('atguigu', 回调函数); // xxx 是组件的 ref -->
          <!-- this.$refs.xxx 可以获取到对应组件的实例对象 vc -->
          <!-- 绑定自定义事件（一次性）：this.$refs.xxx.$once('atguigu', 回调函数); -->
          <!-- 注意：在使用该方式绑定自定义事件时，回调函数要么配置在 methods 中，要么用箭头函数，否则 this 指向会出问题！-->
          <!-- 如果不用箭头函数，this 将是 vc 而不是 vm！ -->
          <!-- 我们通常将 ref 设置组件自定义事件的过程放到 mounted() 生命周期钩子中！ -->

          <!-- 组件上默认是不能使用 Vue 提供的原生事件的，如果要使用需要加上 .native，否则还是会把 @xxx 当做一个叫作 xxx 的组件自定义事件来处理！-->
          <Student ref="student" @click.native="show" />
      </div>
  </div>
</template>

<script>
// 引入组件
// 关闭了语法检查,package.json里的eslintConfig['rule']配置下"vue/multi-word-component-names": "off"就可以用单个单词作为组件名了！
import Teacher from './components/Teacher.vue';
import Student from './components/Student.vue';
// 如果没有在 vue.config.js 中关闭语法检查，那么 vue 默认强制组件的命名必须是多个单词，比如 School 及 Student 会报错！所以此处加了 The 前缀。
// 组件名应该始终是多个单词的，根组件 App 以及 <transition>、<component> 之类的 Vue 内置组件除外。
// 这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。
// 推荐：如果找不到合适的多单词，可以在单词前面加上 项目名/业务名 前缀
import TheSchool from './components/TheSchool';
import todoList from './todoList'
export default {
  name: 'App',
  components: {
    TheSchool,
    Teacher,
    Student,
    todoList
  },
  data() {
    return {
      msg: '欢迎学习Vue！',
      female: '女',
      male: '男',
      studentName: ''
    };
  },
  methods: {
    showDOM() {
      console.log(this); // 这里的 this 是 vc (VueComponent)
      console.log(this.$refs.title); // 真实 DOM 元素： <h1>欢迎学习Vue！</h1>
      console.log(this.$refs.btn); // 真实 DOM 元素：<button>点我输出上方的 DOM 元素</button>
      console.log(this.$refs.sch); // TheSchool 组件的实例对象（vc）
      console.log(document.getElementById('sch')); // TheSchool 组件的真实 DOM 元素：<div class="school" id="sch"></div>
    },
    getSchoolName (name) {
      alert('App收到了学校名称：' + name);
    },
    // 第一个参数作为 name 接收，其它所有的参数接收到 params 数组中
    getStudentName (name, ...params) {
      alert('App收到了学生名称和剩余参数：' + name + ' ' + params);
      this.studentName = name;
    },
    show () {
      console.log('我被点击了！');
    }
  },
  mounted () {
    // 定义格式：this.$refs.xxx.$on('atguigu', 回调函数)    // xxx 是组件的 ref
    this.$refs.student.$on('atguigu', this.getStudentName); // 绑定自定义事件
    // this.$refs.student.$once('atguigu', this.getStudentName);   // 绑定自定义事件（一次性）
    // 除此之外，这种 ref 的写法还可以在这里实现另外非常多的逻辑，如延时器等
    // 注意：在使用该方式，绑定自定义事件时，回调要么配置在 methods 中，要么用箭头函数，否则 this 指向会出问题！
    // 例如：
    // this.$refs.student.$on('atguigu', (name, ...params) => {
    //   console.log('App收到了学生名：', name, params);
    //   this.studentName = name;
    // });
    // 这样不可以！！！
    // this.$refs.student.$on('atguigu', function (name, ...params) {
    //   console.log('App收到了学生名：', name, params);
    //   this.studentName = name;  // 这里的 this 是 vc 而不是 vm !!!!!!!!
    // });
  }
};
</script>

<!--// 子组件中的样式最终都是合并到一块的！
    // 如果样式不加 scoped，那么同名的样式选择器，后引入的会覆盖前引入的！
    // 比如此处，TheSchool 就会覆盖 Student 的！
    // 注意：和配置项中 components 的顺序无关，和 import 的顺序有关！ -->
<!-- 在 APP 组件中，一般不需要加 scoped，因为一般 APP 中的样式都是全局的，其它组件一般也应该接受 -->
<!-- 当 APP 组件样式与其它组件样式冲突时，其它组件样式优先级更高！ -->
<style>
.title {
    color: red;
}
.test2 {
    background-color: gray;
    padding: 5px;
}
</style>
