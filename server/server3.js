// server.js  ——  5001 端口
const express = require('express');
const app = express();

// 允许跨域（可选，若前端仍走代理可不加）
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

/* 1. 学生数据 */
const students = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 }
];
app.get('/students', (req, res) => res.json(students));

/* 2. 汽车数据（原来 5002 的） */
const cars = [
  { id: 101, brand: 'BMW',  price: 300000 },
  { id: 102, brand: 'Benz', price: 350000 }
];
app.get('/cars', (req, res) => res.json(cars));

/* 启动 */
app.listen(5001, () =>
  console.log('All-in-one server running at http://localhost:5001')
);