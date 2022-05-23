
var http = require('http');
var url = require("url")
var querystring = require("querystring")
var fs = require('fs')
const svg2img = require('svg2img');


// var sharp = require('sharp')

http.createServer(function (request, response) {
    var arg = url.parse(request.url).query;
    var params = querystring.parse(arg)
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    let width = params.width || 200;  //宽
    let height = params.height || 100;  // 高
    let bgColor = params.bgColor || '#9c9c9c';  //背景颜色
    let color = params.color || '#fff'; // 文字颜色
    let text = params.text || params.width+' × ' +params.height+''; // 文本

    // 发送响应数据 "Hello World"
    response.writeHead(200, { 'Content-Type': 'image/png+xml' });
    let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect width="${width}" height="${height}" style="fill:${bgColor};stroke-width:1;stroke:${bgColor}" />
        <text x="${width/2}" y="${height/2}" fill="${color}" style="text-anchor: middle;dominant-baseline: middle;">${text}</text>
        </svg>`

    svg2img(svgStr, function(error, buffer) {
        //returns a Buffer
        fs.writeFileSync('foo1.png', buffer);
    });


    fs.readFile('foo1.png', function (err, data) {
        if (err) {
            return console.error(err);
        }
        // console.log("异步读取: " + data.toString());
        response.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
        response.end(data);
    });
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');