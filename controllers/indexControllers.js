var http = require('http');
var url = require("url")
var querystring = require("querystring")
var fs = require('fs')
const svg2img = require('svg2img');

class IndexControllers {
    constructor() {

    }

  async actionIndex(ctx, next) {

      var arg = url.parse(ctx.request.url).query;
      var params = querystring.parse(arg)
      let width = params.width || 200;  //宽
      let height = params.height || 100;  // 高
      let bgColor = params.bgColor || '#9c9c9c';  //背景颜色
      let color = params.color || '#fff'; // 文字颜色
      let text = params.text || params.width + ' × ' + params.height + ''; // 文本
      let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect width="${width}" height="${height}" style="fill:${bgColor};stroke-width:1;stroke:${bgColor}" />
          <text x="${width/2}" y="${height/2}" fill="${color}" style="text-anchor: middle;dominant-baseline: middle;">${text}</text>
          </svg>`

      svg2img(svgStr, function(error, buffer) {
          //returns a Buffer
          fs.writeFileSync('assets/img/foo1.png', buffer);
      });
      ctx.set('Content-Type', 'image/png;charset=utf-8')
      let file = fs.readFileSync('assets/img/foo1.png')
      console.info(ctx.response)
      ctx.body = file
    }
}

module.exports = IndexControllers;