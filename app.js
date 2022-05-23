const Koa = require("koa");
const co = require("co");
const render = require("koa-swig");
const app = new Koa();
// 配置文件
const config = require("./config/index.js");
// 注册路由
require("./controllers/index")(app);
// 静态文件
const serve = require("koa-static");
// 加载静态文件
app.use(serve(config.staticDir));
// 配置模板引擎
app.context.render = co.wrap(render({
    root: config.viewDir, // 把视图层加载引来
    autoescape: true,
    cache: false, // 缓存
    ext: 'html',
    writeBody: false
}));
// 运行端口
app.listen(config.port, () => {
    console.log("server is running..")
});