const router = require('koa-router')()
router.prefix('/gram')
const { query } = require('./db')

router.get('/getallgram', async (ctx, next) => {
    const sql = "select * from gramlist"
    const res = await query(sql, [])
    ctx.body = res
})

router.post('/getgram', async (ctx, next) => {
    const data = ctx.request.body
    const sql1 = 'select * from gramlist where userId=? and gram=?'
    const res1 = await query(sql1, [data.userId, data.gram])
    const sql = 'select * from foodlist where foodId=?'
    const res = await query(sql, [res1[0].foodId])
    ctx.body = { food: res, time: res1[0].time, date: res1[0].date }
})

router.post('/insertgram', async (ctx, next) => {
    const data = ctx.request.body
    const sql = "insert into gramlist (userId, foodId, time, date, gram) values(?, ?, ?, ?, ?)"
    const res = await query(sql, [data.userId, data.foodId, data.time, data.date, data.gram])
    if (res.affectedRows === 1) {
        console.log('insert success')
    }
    ctx.body = { 'status': 'insert success' }
})

router.post('/uploadskip', async (ctx, next) => {
    const sql0 = 'select left(uuid(),8) ropeId'
    const res0 = await query(sql0, [])
    const ropeId = res0[0].ropeId
    const data = ctx.request.body
    const sql = 'insert into ropelist (userId, date, skipNum, skipId) values (?, ?, ?, ?)'
    const res = await query(sql, [data.userId, data.date, data.skipNum, ropeId])
    if (res.affectedRows === 1) {
        console.log('upload success')
    }
    ctx.body = { 'status': 'upload success' }
})

router.post('/getskip', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'select * from ropelist where userId=?'
    const res = await query(sql, [data.userId])
    ctx.body = res
})

router.post('/delskip', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'delete from ropelist where userId=? and skipId=?'
    const res = await query(sql, [data.userId, data.skipId])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

module.exports = router