const express = require('express');
const path = require('path');

const app = express();
const root = path.resolve(__dirname, '..', '..');

app.use(express.static(root));

const server = app.listen(3000, () => {
  console.log('Server chạy ở http://localhost:3000');
});

module.exports = server;