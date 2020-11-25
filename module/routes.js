const fs = require('fs');
module.exports.static = function(){
    let dataObj = fs.readFileSync('./data/data.json');
    return dataObj;
}
exports.getFileMime = function(extname){
    var data = fs.readFileSync("./data/mime.json"); //同步读取文件的方法

    let mimeObj = JSON.parse(data.toString());

    return mimeObj[extname]
};