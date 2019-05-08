const path = require('path')
const app = new (require('koa'))()
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const cors = require('koa2-cors')
const historyApiFallback = require('koa-history-api-fallback')

// error handler
onerror(app)

// koa-body和koa-bodyparser同时使用可能会出现Request Error: request aborted(如需同时使用，需调整中间件顺序，把koa-body放在前面)
app.use(
    koaBody({
        multipart: true, // 支持文件上传
        formidable: {
            maxFieldsSize: 5 * 1024 * 1024 // 2mb (2 * 1024 * 1024)默认
        }
    })
)

// middlewares
app
    .use(bodyparser())
    .use(json())
    .use(logger())
    .use(cors())
    .use(historyApiFallback())

const fs = require('fs')

function writeLog(data) {
    fs.appendFile('./log.txt', data, 'utf8', e => {})
}

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    if (ctx.method.toLocaleLowerCase() === 'get') {
        ctx.request.url = ctx.originalUrl
    }
    await next()
    const ms = new Date() - start
    writeLog(ctx.method + ' ' + ctx.url + ' ' + ms + 'ms \r\n')
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
    writeLog('server error' + err + '\n' + JSON.stringify(ctx) + '\r\n')
    console.error('server error', err, ctx)
})

// 静态文件服务 koa-static 规则位于 koa-router 的系列规则之前
app.use(koaStatic(path.resolve(__dirname, './public')))

// 路由汇总（注册路由）
const registerRouter = require('./routers')
app.use(registerRouter())

module.exports = app
