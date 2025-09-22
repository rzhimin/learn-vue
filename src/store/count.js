// 求和相关的配置
const count = {
  namespaced: true, // 开启命名空间
  // 准备 Actions ———— 用于响应组件中的动作
  actions: {
    // 普通的 + 和 - 由于 “原始动作数据” === “最终动作数据”，所以可以直接跳过 Actions
    /*
        jia(context, value) {
            console.log('Actions 中的 jia 被调用了');
            context.commit('JIA', value);
        },
        jian(context, value) {
            console.log('Actions 中的 jian 被调用了');
            context.commit('JIAN', value);
        },
        */
    jiaOdd(context, value) {
      // context：【翻译：上下文】，这个参数是一个对象，里面包含了 state getters commit() dispathc() 等属性和方法
      // value：这个参数就是我们 $store.dispatch('jiaOdd', 数据) 中的 “数据”
      console.log("Actions 中的 jiaOdd 被调用了");
      if (context.state.sum % 2) {
        context.commit("JIA", value);
      }
    },
    jiaWait(context, value) {
      console.log("Actions 中的 jiaWait 被调用了");
      setTimeout(() => {
        context.commit("JIA", value);
      }, 500);
    },
    // context 中除了常用的 commit() 外，还有 dispathc() 方法
    // dispathc() 不是 this.$store.dispatch() 上调用的吗？这里咋又有呢？
    // 提供 dispathc() 方法的原因在于，当需要多个 Actions 进行处理时，我们可以在一个 Action 处理完后转发给下一个 Action 继续处理！牛啊！
    // 比如某个 Action 中的逻辑太复杂，那么我们可以将其拆分为多个 Action，逐一处理！^^
  },
  // 准备 Mutations ————— 用于操作数据（State）
  mutations: {
    // Mutations 中的函数名采用大写（约定风格）
    JIA(state, value) {
      console.log("Mutations 中的 JIA 被调用了");
      state.sum += value;
    },
    JIAN(state, value) {
      console.log("Mutations 中的 JIAN 被调用了");
      state.sum -= value;
    },
    ADD_PERSON(state, value) {
      console.log("Mutations 中的 ADD_PERSON 被调用了");
      state.personList.unshift(value);
    },
  },
  // 准备 State ———— 用于存储数据
  state: {
    sum: 1, // 当前的和
    school: "迦里顿",
    subject: "前端",
    personList: [{ id: "001", name: "张三" }],
  },
  // 准备 Getters ———— 用于将 state 中的数据进行加工
  // getters 也是一个配置项，但是它不是必须的
  // 用途：可以把 Getters 理解为”计算属性“，把 State 的数据进行再加工
  // 优点：相比于组件的计算属性来说 Getters 是所有组件都可以用的（不用每个组件都单独实现一遍），提高了复用性和封装性
  // 理解：State 类似于 Data，Getters 类似于 Computed
  // 推荐：对于 Vuex 管理的数据，如果需要再加工并且加工逻辑比较复杂，并且还需要复用，那么推荐使用 Getters 而不是 Computed
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};

export default count;
