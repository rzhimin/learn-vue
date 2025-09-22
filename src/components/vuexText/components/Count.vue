<template>
  <div>
    <!-- 在模板中可以直接访问 vm vc 的值所以不用在前面加上 this -->
    <!-- 获取 State 值 -->
    <h1>当前求和为：{{ $store.state.count.sum }}</h1>
    <!-- 获取 Getters 值 -->
    <h3>当前求和放大10倍为：{{ $store.getters['count/bigSum'] }}</h3>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
    <h3 style="color: red">Person组件的总人数是：{{ personList.length }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数则加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Count",
  data() {
    return {
      n: 1, // 用户选择的数字
    };
  },
  computed: {
    // 借助 mapState 生成计算属性：sum、school、subject（对象写法）
    // ...mapState({sum:'sum', school:'school', subject:'subject'}),
    // 借助 mapState 生成计算属性：sum、school、subject（数组写法）
    // ...mapState(["sum", "school", "subject"]),

    // 借助 mapGetters 生成计算属性：bigSum（对象写法）
    //...mapGetters({bigSum:'bigSum'}),
    // 借助 mapGetters 生成计算属性：bigSum（数组写法）
    // ...mapGetters(["bigSum"]),

    //  在之前的基础上，要指定名称(模块化写法)
    ...mapState("count", ["sum", "school", "subject"]),
    ...mapState("person", ["personList"]),
    ...mapGetters("count", ["bigSum"]),
  },
  methods: {
    // 程序员亲自写方法
    /*  increment() {
            this.$store.commit('JIA', this.n);
        },
        decrement() {
            this.$store.commit('JIAN', this.n);
        }, */

    // mapActions 与 mapMutations 使用时，若需要传递参数，那么需要：在模板中绑定事件时传递好参数，否则参数是事件对象！！！

    // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 Mutations（对象写法）
    // ...mapMutations({JIA: 'JIA', JIAN: 'JIAN'}),
    // 可以指定名称
    // ...mapMutations({ increment: "JIA", decrement: "JIAN" }),

    // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 Mutations（数组写法）
    // 数组写法前提是名称相同
    // ...mapMutations(['JIA', 'JIAN']),

    /* ************************************************* */
    // 程序员亲自写方法
    /*
        incrementOdd() {
            this.$store.dispatch('jiaOdd', this.n);
        },
        incrementWait() {
            this.$store.dispatch('jiaWait', this.n);
        },
         */
    // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 Actions（对象写法）
    // ...mapActions({jiaOdd: 'jiaOdd', jiaWait: 'jiaWait'})
    // 可以指定名称
    // ...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),

    // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 Actions（数组写法）
    // 数组写法前提是名称相同
    // ...mapActions(['jiaOdd','jiaWait'])

    // 在之前的基础上，要指定名称(模块化写法)
    ...mapMutations("count", { increment: "JIA", decrement: "JIAN" }),
    ...mapActions("count", {
      incrementOdd: "jiaOdd",
      incrementWait: "jiaWait",
    }),
  },
  mounted() {
    // this 上会出现 $store
    console.log("Count", this.$store);
  },
};
</script>

<style lang="css">
button {
  margin-left: 5px;
}
</style>
