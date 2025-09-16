<template>
  <div class="test1">
    <img src="./assets/logo.png" alt="logo" />
    <!-- ref 属性： -->
    <!-- 1. 被用来给元素或子组件注册引用信息（id 的替代者） -->
    <!-- 2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc） -->
    <!-- 3. 使用方式： -->
    <!-- 3-1. 打标识：<h1 ref="xxx">.....</h1> 或 <TheSchool ref="xxx"></TheSchool> -->
    <!-- 3-2. 获取：this.$refs.xxx -->
    <h1 ref="title" class="title" v-text="msg"></h1>
    <button ref="btn" @click="showDOM">点我输出ref的 DOM 元素</button>
    <!-- 父组件可以在调用子组件时传递值给子组件，在子组件内用 props 配置项接收 -->
    <!--
      不加冒号，那么默认传递的都是字符串格式，
      加了冒号那么就是绑定值（其类型及值便是引号内部表达式的计算值）
    -->
    <!-- 子组件通过调用父组件传递的函数（作为prop）直接修改父组件状态 -->
    <TheSchool ref="sch" id="sch" :getSchoolName="getSchoolName"></TheSchool>
    <!-- 使用 @ 或 v-on 添加自定义事件，也可以在mounted中通过this.$refs.xxx.$on('atguigu', 回调函数)  -->
    <!-- 组件上默认是不能使用 Vue 提供的原生事件的，如果要使用需要加上 .native，否则还是会把 @xxx 当做一个叫作 xxx 的组件自定义事件来处理！ -->
    <Student
      ref="student"
      name="小美"
      :sex="female"
      :age="18"
      @getStudentName="getStudentName"
      @click.native="show"
    />
    <Teacher name="语文老师" :sex="male" :age="50" />
    <h1>{{ msg }}，学生姓名是：{{ studentName }}</h1>
  </div>
</template>

<script>
// 引入组件
import Teacher from './components/Teacher'
import Student from './components/Student'
import TheSchool from './components/TheSchool'

export default {
  name: 'Test1',
  components: {
    TheSchool,
    Teacher,
    Student,
  },
  data() {
    return {
      msg: '欢迎学习Vue！',
      female: '女',
      male: '男',
      studentName: '',
    }
  },
  methods: {
    showDOM() {
      console.log(this) // 这里的 this 是 vc (VueComponent)
      console.log(this.$refs.title) // 真实 DOM 元素： <h1>欢迎学习Vue！</h1>
      console.log(this.$refs.btn) // 真实 DOM 元素：<button>点我输出上方的 DOM 元素</button>
      console.log(this.$refs.sch) // TheSchool 组件的实例对象（vc）
      console.log(document.getElementById('sch')) // TheSchool 组件的真实 DOM 元素：<div class="school" id="sch"></div>
    },
    getSchoolName(name) {
      alert('App收到了学校名称：' + name)
    },
    // 第一个参数作为 name 接收，其它所有的参数接收到 rest 数组中
    getStudentName(name, ...rest) {
      alert('App收到了学生名称和剩余参数：' + name + ' ' + rest)
      this.studentName = name
    },
    show() {
      console.log('我被点击了！')
    },
  },
  mounted() {
    // 下面内容不推荐使用，仅供了解
    //#region
    // ---------------------------------------------
    // 定义格式：this.$refs.xxx.$on('atguigu', 回调函数)    // xxx 是组件的 ref
    // this.$refs.student.$on('atguigu', this.getStudentName) // 绑定自定义事件
    // this.$refs.student.$once('atguigu', this.getStudentName); // 绑定自定义事件（一次性）
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
    // ---------------------------------------------
    //#endregion
  },
}
</script>


<style scoped>

</style>
