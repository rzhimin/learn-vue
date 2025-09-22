// 学生服务 5001
const express = require('express');
const app = express();

const students = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 }
];

app.get('/students', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');   // 允许跨域（可选）
  res.json(students);
});

app.listen(5001, () => console.log('Server1(Stu) running at http://localhost:5001'));