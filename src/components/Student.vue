<template>
  <div class="demo">
    <h1>{{ msg }}</h1>
    <h2 class="title">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <!-- 这里 myAge 一定得是数值类型，否则 + 1 处理就会出错 -->
    <h2 class="fs20">学生年龄：{{ myAge + 1 }}</h2>
    <button @click="addAge">年龄+1</button>
    <h2>当前求和为：{{ number }}</h2>
    <!-- $listeners 是 Vue 的一个特殊属性，它会收集父组件传递到当前子组件上的所有非原生事件监听器（即没有 .native 修饰符的事件）。当子组件通过 v-on="$listeners" 将这些监听器绑定到内部元素时，父组件的 @click 等事件会自动关联到内部元素的对应事件上。 -->
    <button v-on="$listeners" @click="addNumber">点我number++</button>
    <button @click="sendStudentNameToApp">把学生名给App</button>
    <button @click="sendStudentNameToSchool">把学生名给School组件</button>
    <button @click="unbind">解绑getStudentName事件</button>
    <button @click="death">销毁当前Student组件的实例(vc)</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  //#region
  // -----------------------------------------------------------------------
  // props接收参数
  // 1.简单声明接收
  //    props:['name', 'age', 'sex']
  // 2.接收的同时对数据进行类型限制,
  // 类型不对时还是会接收，但是会在控制台报错！（所以对于有类型限制的，要用:绑定）
  /*    props:{
            name: String,
            age: Number,
            sex: String
          }
    */
  // 3.接收的同时对数据进行：类型限制 + 默认值的指定 + 必要性的限制
  //   类型不对时还是会接收，但是会在控制台报错！（所以对于有类型限制的，在父组件传值时要用:绑定）
  /* props: {
          name: {
            type: String,
            required: true // 必须要传的
          },
          age: {
            type: Number,
            default: 18,
          }
        }, 
    */
  // 特别注意：
  // props 所接收到的值并不是源数据的副本，而是源数据的引用值，即：源数据变化的同时 props 数据也会变化
  // 所以，其实我们修改 props 中的数据，源数据也是在同步变化的，只不过 Vue 禁止了这种做法（会报错且没效果）！！！
  // 但是，注意啦！有一种情况比较特殊！！！！
  // 当数据是对象或数组的形式时，比如：
  // test: [
  //     { name: 'zjr', age: 18 },
  //     { name: 'yp', age: 18 }
  // ]
  // --------------------------------
  //  props: ['test']
  //  那么在 props 中直接修改整个对象是不可以的！比如：this.test[0] = { name: 'lxy', age: 17 }，这样会报错！
  // 但是，修改其中的一项值却是可以的！比如：this.test[0].age = 22，这样不会报错！并且修改的同时源数据也会同步改变！
  // 不过，还是不建议以任何方式修改 props 的值！！！
  // -----------------------------------------------------------------------
  //#endregion
  props: {
    name: {
      type: String, // name 的类型是字符串
      required: false, // name 是必要的
    },
    age: {
      type: Number,
      default: 99, // 默认值（注意：有默认值，就不要指定必要性了，否则就自相矛盾了）
    },
    sex: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      msg: '学生信息',
      // props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会报错！！！
      // 若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据（props 中的数据会去到 vc 上）
      // data 中的数据不要与 props 中得数据重名（因为 props 中的数据会去到 vc 上，而 vue 优先使用 props）
      myAge: this.age,
      number: 0,
    }
  },
  methods: {
    death() {
      // 销毁了当前 Student 组件的实例，销毁后 Student 实例的自定义事件便会全都不奏效。
      // 注意：Vue 原生事件依旧可以调用（例如 @click）（因为 Vue 原生事件其实也是用 DOM 事件封装的，DOM 事件注册了是不会被销毁的）
      this.$destroy()
    },
    // 哪个组件上的自定义事件就在哪个组件上解绑
    unbind() {
      // 用户在子组件中调用$off，只能解绑那些通过$on在子组件内部添加的事件监听器，而无法解绑父组件通过模板语法@或v-on绑定的监听器
      this.$off('getStudentName') // 解绑一个自定义事件
      // this.$off(['getStudentName', 'demo', 'demo2']); // 解绑多个自定义事件
      // this.$off(); // 解绑所有的自定义事件
    },

    sendStudentNameToSchool() {
      this.$bus.$emit('hello', this.name)
    },
    sendStudentNameToApp() {
      // 触发 Student 组件实例身上的 getStudentName 事件，同时传递参数
      this.$emit('getStudentName', this.name, 666, 888, 999)
    },
    addNumber() {
      this.number++
    },
    addAge() {
      // 修改 data 而不是修改 props
      this.myAge++
    },
  },
}
</script>

<!-- scoped：让样式在局部生效，防止冲突 -->
<style lang="scss" scoped>
$color1: rgb(128, 237, 243);
$color2: rgb(220, 71, 58);
.demo {
  background-color: $color1;
  .title {
    color: $color2;
  }
  .fs20 {
    font-size: 20px;
  }
}
</style>
