<!-- 每个 .vue 文件就是一个 Vue 组件 -->
<!-- 其文件名必须与组件名称对应 -->
<!-- <template>、<script>、<style> 三者单独存在于组件文件中（单文件组件） -->

<template>
  <!-- vue2.0 必须有一个根标签包裹 -->
  <div>
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
      <TheSchool ref="sch" id="sch" :getSchoolName="getSchoolName" ></TheSchool>
      <!-- 使用 @ 或 v-on 添加自定义事件，也可以在mounted中通过this.$refs.xxx.$on('atguigu', 回调函数)  -->
      <!-- 组件上默认是不能使用 Vue 提供的原生事件的，如果要使用需要加上 .native，否则还是会把 @xxx 当做一个叫作 xxx 的组件自定义事件来处理！ -->
      <Student ref="student" name="小美" :sex="female" :age="18" @getStudentName="getStudentName" @click.native="show"/>
      <Teacher name="语文老师" :sex="male" :age="50" />
      <h1>{{ msg }}，学生姓名是：{{ studentName }}</h1>
    </div>
    
    <div className="test2">
      <myAnimate></myAnimate>
      <testProxy></testProxy>
      <githubSearch></githubSearch>
      <slotsText></slotsText>
      <vuexText></vuexText>
    </div>
    <div class="test3">
      <div class="row">
        <!-- 一般组件 -->
        <Banner />
      </div>
      <div class="row">
        <div class="col-xs-2 col-xs-offset-2">
          <div class="list-group">
            <!-- 路由的切换 -->
            <!-- 利用 name 别名（此处不建议这么写，因为路径只有一级没必要依靠别名） -->
            <router-link
              class="list-group-item"
              active-class="active"
              :to="{ name: 'guanyu' }"
              >About</router-link
            >
            <router-link
              class="list-group-item"
              active-class="active"
              to="/home"
              >Home</router-link
            >
          </div>
        </div>
        <div class="col-xs-6">
          <div class="panel">
            <div class="panel-body">
              <!-- 路由组件,指定组件的呈现位置 -->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="test4">
      <div>
        <button>原生的按钮</button>
        <input type="text" />
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-row>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-s-check" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
      </div>
    </div>
    <div class="test5">
      <validateTest></validateTest>
    </div>
    <todoList></todoList>
  </div>
</template>

<script>
// 引入组件
import Teacher from './components/Teacher'
import Student from './components/Student'
import TheSchool from './components/TheSchool'
import todoList from './components/todoList'
import myAnimate from './components/myAnimate'
import testProxy from './components/testProxy'
import githubSearch from './components/githubSearch'
import slotsText from './components/slotsText'
import vuexText from './components/vuexText'
import Banner from './components/Banner'
import validateTest from './pages/validateTest'

export default {
  name: 'App',
  components: {
    TheSchool,
    Teacher,
    Student,
    todoList,
    myAnimate,
    testProxy,
    githubSearch,
    slotsText,
    vuexText,
    Banner,
    validateTest,
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
