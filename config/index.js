const path = require("path");
const config = {
  viewDir: path.join(__dirname, "..", "views"), // 把视图层加载引来
  staticDir: path.join(__dirname, "..", "assets") // 静态文件
};
// 运行环境对应的端口
if (process.env.NODE_ENV === "development") {
    config.port = 3000;
} else if (process.env.NODE_ENV === "production") {
    config.port = 80;
}

module.exports = config;