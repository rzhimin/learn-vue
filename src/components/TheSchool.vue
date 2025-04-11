<template>
  <div class="school">
    <h3>学校名称：{{ name }}</h3>
    <h3>学校地址：{{ address }}</h3>
    <h3>组件 data 数据的优先级更高: {{ x }}</h3>
    <button @click="test">测试混入的优先级</button>
		<!-- 有传入getSchoolName这个方法才显示 -->
    <button v-if="showSchoolNameButton" @click="sendSchoolName">把学校名给App</button>
  </div>
</template>

<script>
import { hunhe, hunhe2 } from '../mixins/01'
export default {
  name: 'TheSchool',
	props: {
    getSchoolName: {  // 推荐改用对象形式声明 props
      type: Function,
      default: null
    }
  },
	// 局部混入
  mixins: [hunhe, hunhe2],
  data() {
    return {
      name: '北大',
      address: '五道口',
      x: 666,
    }
  },
  methods: {
    test() {
      alert('组件方法优先级更高')
    },
    sendSchoolName() {
			console.log('this :>> ', this);
      this.getSchoolName(this.name)
    },
  },
  mounted() {
    console.log('mixin里的周期比我先调用，我后调用')
    // 全局事件总线
    // 回调要么在 methods 中，要么使用箭头函数！
    this.$bus.$on('hello', (data) => {
      console.log('我是School组件，收到了数据', data)
    })
  },
  beforeDestroy() {
		// 全局事件总线（Vue.prototype.$bus）上的事件监听器不会自动销毁，必须手动清理，否则会导致内存泄漏和意外触发
    this.$bus.$off('hello')
  },
  computed: {
    showSchoolNameButton() {
      return this.getSchoolName instanceof Function
    }
  }
}
</script>

<!-- scoped：让样式在局部生效，防止冲突 -->
<style scoped>
.school {
  background-color: skyblue;
}
</style>