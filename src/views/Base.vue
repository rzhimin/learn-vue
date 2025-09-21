<template>
  <div class="test1">
    <h1 v-text="msg"></h1>
    <div v-html="msg1"></div>
    <h2 v-cloak>{{ name }}</h2>
    <h2 v-once>初始化的n值是:{{ n }}</h2>
    <h2>当前的n值是:{{ n }}</h2>
    <button @click="n++">点我n+1</button>
    <h1>插值语法</h1>
    <!-- {{xxx}}可以读取到data中的所有属性 -->
    <!-- v-pre：跳过vue模版解析 -->
    <h2 v-pre>{{ xxx }}是Vue的语法：插值表达式</h2>
    <h3>你好，{{ name }}</h3>
    <hr />
    <h1>指令语法</h1>
    <!-- 引号内写的是js表达式 -->
    <a :href="school.url.toUpperCase()" x="hello"
      >点我去{{ school.name }}学习1</a
    ><br />
    <a :href="school.url" x="hello">点我去{{ school.name }}学习2</a>
    <hr />
    <h1>数据绑定</h1>
    单向数据绑定：<input type="text" :value="name" /><br />
    双向数据绑定：<input type="text" v-model="name" /><br />
    <hr />
    <h1>事件绑定</h1>
    <!-- <button v-on:click="showInfo">点我提示信息</button> -->
    <!-- <button @click="showInfo1()">写了不传，方法接收的是undefined</button> -->
    <button @click="showInfo1">点我提示信息1（不传参）</button>
    <!-- 主动传事件本身 -->
    <button @click="showInfo2($event, 66)">点我提示信息2（传参）</button>
    <!-- 阻止默认事件（常用） -->
    <a href="http://www.baidu.com" @click.prevent="showInfo">点我提示信息</a>
    <!-- 阻止事件冒泡（常用） -->
    <div class="demo1" @click="showInfo1">
      <button @click.stop="showInfo">点我提示信息</button>
      <!-- 修饰符可以连续写 -->
      <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
    </div>
    <!-- 事件只触发一次（常用） -->
    <button @click.once="showInfo">点我提示信息</button>
    <input
      type="text"
      placeholder="按下回车提示输入"
      @keydown.enter="showInfo"
    />
    <hr />
    <h1>computed计算属性</h1>
    姓：<input type="text" v-model="firstName" /> 名：<input
      type="text"
      v-model="lastName"
    />
    全名：<span>{{ fullName }}</span>
    <hr />
    <h1>watch监视属性</h1>
    <button @click="changeWeather">切换天气</button>
    今天天气很{{ info }}
    <br />
    <button @click="changeNumber">改变numbers值</button>
    深层级修改监听值：{{ numbers.c.d.e }}
    <hr />
    <h1>绑定样式</h1>
    <!-- 字符串写法，适用于：样式的类名不确定，需要动态指定，可用模板字符串拼接 -->
    <div class="basic" :class="mood">{{ name }}</div>
    <!-- 数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="basic" :class="classArr">{{ name }}</div>
    <!-- 对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
    <div class="basic" :class="classObj">{{ name }}</div>
    <!-- 绑定style样式--对象写法 -->
    <div class="basic" :style="styleObj">{{ name }}</div>
    <!-- 绑定style样式--数组写法 -->
    <div class="basic" :style="styleArr">{{ name }}</div>
    <hr />
    <h1>条件渲染</h1>
    <!-- 使用v-if做条件渲染 -->
    <h2 v-if="false">欢迎来到{{ name }}</h2>
    <h2 v-if="1 === 1">欢迎来到{{ name }}</h2>

    <!-- v-else和v-else-if -->
    <div v-if="n === 1">Angular</div>
    <div v-else-if="n === 2">React</div>
    <div v-else-if="n === 3">Vue</div>
    <div v-else>哈哈</div>

    <!-- v-if与template的配合使用 -->
    <!-- 就不需要写好多个判断，写一个就行 -->
    <!-- 这里的思想就像事件代理的使用 -->
    <template v-if="n === 1">
      <h2>你好</h2>
      <h2>尚硅谷</h2>
      <h2>北京</h2>
    </template>

    <!-- 使用v-show做条件渲染 -->
    <h2 v-show="false">欢迎来到{{ name }}</h2>
    <h2 v-show="1 === 1">欢迎来到{{ name }}</h2>
    <hr />
    <h1>列表渲染</h1>
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数组）</h2>
    <ul>
      <li v-for="(p, index) of persons" :key="index">
        {{ p.name }}-{{ p.age }}
      </li>
    </ul>

    <!-- 遍历对象 -->
    <h2>汽车信息（遍历对象）</h2>
    <ul>
      <li v-for="(value, k) of car" :key="k">{{ k }}-{{ value }}</li>
    </ul>

    <!-- 遍历字符串 -->
    <h2>测试遍历字符串（用得少）</h2>
    <ul>
      <li v-for="(char, index) of str" :key="index">{{ char }}-{{ index }}</li>
    </ul>

    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数（用得少）</h2>
    <ul>
      <li v-for="(number, index) of 5" :key="index">
        {{ index }}-{{ number }}
      </li>
    </ul>
    <hr />
    <h1>ref属性</h1>
    <!-- 1. 被用来给元素或子组件注册引用信息（id 的替代者） -->
    <!-- 2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc） -->
    <!-- 3. 使用方式： -->
    <!-- 3-1. 打标识：<h1 ref="xxx">.....</h1> 或 <TheSchool ref="xxx"></TheSchool> -->
    <!-- 3-2. 获取：this.$refs.xxx -->
    <h1 ref="title">测试</h1>
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
      @click.native="showClickMessage"
    />
    <Teacher name="语文老师" :sex="male" :age="50" />
  </div>
</template>

<script>
// 引入组件
import Teacher from "@/components/Base/Teacher";
import Student from "@/components/Base/Student";
import TheSchool from "@/components/Base/TheSchool";

export default {
  name: "Base",
  components: {
    TheSchool,
    Teacher,
    Student,
  },
  data() {
    return {
      msg: "你好啊",
      msg1: "<h3>你好啊！</h3>",
      name: "jack",
      n: 1,
      school: {
        name: "百度",
        url: "http://www.baidu.com",
      },
      firstName: "张",
      lastName: "三",
      isHot: true,
      numbers: {
        c: {
          d: {
            e: 100,
          },
        },
      },
      mood: "normal",
      classArr: ["atguigu1", "atguigu2", "atguigu3"],
      classObj: {
        atguigu1: false,
        atguigu2: false,
      },
      styleObj: {
        fontSize: "40px",
        color: "red",
      },
      styleArr: [
        {
          fontSize: "40px",
          color: "blue",
        },
        {
          backgroundColor: "gray",
        },
      ],
      persons: [
        { id: "001", name: "张三", age: 18 },
        { id: "002", name: "李四", age: 19 },
        { id: "003", name: "王五", age: 20 },
      ],
      car: {
        name: "奥迪A8",
        price: "70万",
        color: "黑色",
      },
      str: "hello",
      female: "女",
      male: "男",
    };
  },
  methods: {
    showDOM() {
      console.log(this); // 这里的 this 是 vc (VueComponent)
      console.log(this.$refs.title); // 真实 DOM 元素： <h1>欢迎学习Vue！</h1>
      console.log(this.$refs.btn); // 真实 DOM 元素：<button>点我输出上方的 DOM 元素</button>
      console.log(this.$refs.sch); // TheSchool 组件的实例对象（vc）
      console.log(document.getElementById("sch")); // TheSchool 组件的真实 DOM 元素：<div class="school" id="sch"></div>
    },
    getSchoolName(name) {
      alert("App收到了学校名称：" + name);
    },
    // 第一个参数作为 name 接收，其它所有的参数接收到 rest 数组中
    getStudentName(name, ...rest) {
      alert("App收到了学生名称和剩余参数：" + name + " " + rest);
    },
    showClickMessage() {
      console.log("我被点击了！");
    },
    showInfo(event) {
      alert("同学你好！");
    },
    // 如果vue模板没有写event，会自动传 event 给函数
    showInfo1(event) {
      console.log(event.target.innerText);
      console.log(this); //此处的this是vm
      alert("同学你好1！");
    },
    showInfo2(event, number) {
      console.log(event, number);
      console.log(event.target.innerText);
      console.log(this); //此处的this是vm
      alert(`同学你好2！！传入参数${number}`);
    },
    changeWeather() {
      this.isHot = !this.isHot;
    },
    changeNumber() {
      this.numbers.c.d.e += this.numbers.c.d.e;
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
  computed: {
    // 常用简写方式
    // fullName() {
    //     		console.log('get被调用了')
    // 		return this.firstName + '-' + this.lastName
    // 		}
    // 完整版写法
    fullName: {
      //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
      //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
      get() {
        console.log("get被调用了");
        return this.firstName + "-" + this.lastName;
      },
      //set什么时候调用? 当fullName被修改时。
      // 可以主动在控制台修改fullName来查看情况
      set(value) {
        console.log("set", value);
        const arr = value.split("-");
        this.firstName = arr[0];
        this.lastName = arr[1];
      },
    },
    info() {
      return this.isHot ? "炎热" : "凉爽";
    },
  },
  watch: {
    //简写
    //  isHot(newValue, oldValue) {
    // 	console.log('isHot被修改了', newValue, oldValue, this)
    // }
    isHot: {
      immediate: true, // 初始化时让handler调用一下
      // handler什么时候调用？当isHot发生改变时。
      handler(newValue, oldValue) {
        console.log("isHot被修改了", newValue, oldValue);
      },
    },
    //监视多级结构中某个属性的变化
    /* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
    //监视多级结构中所有属性的变化
    numbers: {
      deep: true,
      handler() {
        console.log("numbers改变了");
      },
    },
  },
};
</script>


<style scoped>
.basic {
  height: 50px;
}
.normal {
  background-color: skyblue;
}
.atguigu1 {
  background-color: yellowgreen;
}
.atguigu2 {
  font-size: 30px;
  text-shadow: 2px 2px 10px red;
}
.atguigu3 {
  border-radius: 20px;
}
[v-cloak] {
  display: none;
}
</style>
