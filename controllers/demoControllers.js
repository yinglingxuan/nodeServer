class DemoControllers {
    constructor() {

    }

    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('index.html',{
            content:"demo"
        });
    }
}

module.exports = DemoControllers;