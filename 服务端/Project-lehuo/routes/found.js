const router = require('koa-router')()
router.prefix('/found')
const { query } = require('./db')

router.get('/getfound', async (ctx, next) => {
    const sql = 'select * from foundlist'
    const res = await query(sql, [])
    ctx.body = res
})

module.exports = router