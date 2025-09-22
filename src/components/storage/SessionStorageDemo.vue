<template>
  <div>
    <h2>sessionStorage 演示（Vue 2）</h2>

    <button @click="saveData">保存数据</button>
    <button @click="readData">读取数据</button>
    <button @click="deleteData">删除 msg2</button>
    <button @click="deleteAllData">清空所有</button>

    <p>msg： <span v-text="msg"></span></p>
    <p>msg2：<span v-text="msg2"></span></p>
    <p>person：<span v-text="personStr"></span></p>
  </div>
</template>

<script>
export default {
  name: "sessionStorageDemo",
  data() {
    return {
      msg: "",
      msg2: "",
      personStr: "",
      p: { name: "张三", age: 18 },
    };
  },
  methods: {
    saveData() {
      sessionStorage.setItem("msg", "hello!");
      sessionStorage.setItem("msg2", 666);
      sessionStorage.setItem("person", JSON.stringify(this.p));
    },
    readData() {
      this.msg = sessionStorage.getItem("msg");
      this.msg2 = sessionStorage.getItem("msg2");
      const result = sessionStorage.getItem("person");
      this.personStr = result ? JSON.parse(result) : "";
    },
    deleteData() {
      sessionStorage.removeItem("msg2");
      this.readData(); // <-- 删完再读
    },
    deleteAllData() {
      sessionStorage.clear();
      this.readData(); // <-- 清空后再读
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 8px;
}
p {
  margin: 4px 0;
}
</style>
