<template>
  <div class="col-xs-offset-1 col-xs-10">
    <h2>导航</h2>
    <el-row>
      <el-button @click="back">后退back</el-button>
      <el-button @click="forward">前进forward</el-button>
      <el-button @click="go1">go(1)</el-button>
      <el-button @click="go2">go(-1)</el-button>
      <el-button @click="localStorage">{{ message }}</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      message: '添加 localStorage【hasAuth: true】',
    }
  },
  methods: {
    // $router：路由器中（实际是其原型对象上）包含控制前进后退的API $router.forward $router.back $router.go
    // 其中：
    // this.$router.forward()   // 前进
    // this.$router.back()      // 后退
    // this.$router.go() 	    // 可前进也可后退
    back() {
      this.$router.back()
    },
    forward() {
      this.$router.forward()
    },
    go1() {
      // 负数：后退
      // 正数：前进
      this.$router.go(1) // 步数：整数值
    },
    go2() {
      this.$router.go(-1)
    },
    localStorage() {
      if (this.message === '添加 localStorage【hasAuth: true】') {
        localStorage.setItem('hasAuth', 'true')
        this.message = '删除 localStorage【hasAuth: true】'
      } else {
        localStorage.removeItem('hasAuth')
        this.message = '添加 localStorage【hasAuth: true】'
      }
    },
  },
}
</script>

<style scoped>
.el-row {
  margin-bottom: 12px;
}
</style>>
  
