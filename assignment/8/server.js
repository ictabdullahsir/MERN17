const express = require('express');
const app = express();
const port = 5000;


app.get('/', (req, res) => {
  res.json({ 
  "message": "Welcome to Express.js Server"
 });
});

app.get('/about', (req, res) => {
  res.json({ 
  "message": "This is About Page",
  
 });
});


app.get('/contact', (req, res) => {
  res.json({ 
  "message": "This is Contact Page",
  
 });
});


app.get('/services', (req, res) => {
  res.json({ 
  "message": "This is Services Page",
  
 });
});


app.get('/students', (req, res) => {
  res.json({ 
  "message": "student list",
  
 });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});