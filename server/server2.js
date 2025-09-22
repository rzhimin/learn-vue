// 汽车服务 5002
const express = require('express');
const app = express();

const cars = [
  { id: 101, brand: 'BMW', price: 300000 },
  { id: 102, brand: 'Benz', price: 350000 }
];

app.get('/cars', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(cars);
});

app.listen(5002, () => console.log('Server2(Car) running at http://localhost:5002'));