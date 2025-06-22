const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var cors = require('koa2-cors')
const session = require('koa-session')

const users = require('./routes/users')
const datas = require('./routes/datas')
const index = require('./routes/index')
const map = require('./routes/map')
const menu = require('./routes/menu')
const food = require('./routes/food')
const found = require('./routes/found')
const collect = require('./routes/collect')


// error handler
onerror(app)

// middlewares
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'session',
  maxAge: 1000 * 60 * 5,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};
app.use(session(CONFIG, app));
app.use(cors({ credentials: true }));
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(datas.routes(), datas.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(map.routes(), map.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(food.routes(), food.allowedMethods())
app.use(found.routes(), found.allowedMethods())
app.use(collect.routes(), collect.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app