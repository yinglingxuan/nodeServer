const router = require("koa-simple-router");
const IndexController = require("./indexControllers");
const DemoControllers = require("./demoControllers");
const indexController = new IndexController();
const demoControllers = new DemoControllers();
module.exports = app => {
    app.use(router(_ => {
        _.get("/", indexController.actionIndex);
      _.get('/index.html', indexController.actionIndex);
      _.get("/demo", demoControllers.actionIndex);
    }))
};