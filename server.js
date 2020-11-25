const express = require('express');
const app = express();
const routes = require('./module/routes.js');

app.get('/data', (require, resopnse) => {
    resopnse.header("Access-Control-Allow-Origin", "*");
    let data = routes.static();
    console.log('数据传输');
    resopnse.send(data);
});
app.listen(8000, () => {
    console.log('服务启动');
});