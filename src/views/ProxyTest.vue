<template>
  <div>
    <!-- 假设：有两台后端服务器： -->
    <!-- 服务器1：请求 http://localhost:5001/students 可以返回学生数据 -->
    <button @click="getStudents">获取学生信息</button>
    <!-- 服务器2：请求 http://localhost:5002/cars 可以返回汽车数据 -->
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
// 安装：npm i axios
import axios from "axios";

export default {
  name: "ProxyTest",
  methods: {
    getStudents() {
      // 不走代理
      axios.get("http://localhost:5001/students").then(
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
    getCars() {
      // 代理后 端口应从 5002 改为 8080
      axios.get("http://localhost:8080/demo/cars").then(
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
  },
};
</script>
