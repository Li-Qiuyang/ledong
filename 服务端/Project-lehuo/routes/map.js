const router = require('koa-router')()
router.prefix('/map')
const { query } = require('./db')

router.get('/getmap', async (ctx, next) => {
    const sql = 'select * from maplist'
    const res = await query(sql, [])
    ctx.body = res
})

router.post('/uploadmap', async (ctx, next) => {
    const sql0 = 'select left(uuid(),8) mapid'
    const res0 = await query(sql0, [])
    const mapid = res0[0].mapid
    const map = ctx.request.body
    map.point = map.point.map(item => JSON.stringify(item)).toString()
    const sql = 'insert into maplist (point, time, date, type, distance, head, id, speed, mapid) values (?,?,?,?,?,?,?,?,?)'
    const res = await query(sql, [map.point, map.time, map.date, map.type, map.distance, map.head, map.id, map.speed, mapid])
    if (res.affectedRows === 1) {
        console.log('upload success')
    }
    ctx.body = { 'status': 'upload success' }
})

router.post('/updatemap', async (ctx, next) => {
    const map = ctx.request.body
    const sql = 'update maplist set point=?, time=?, date=?, type=?, distance=?, head=?, speed=? where id=? and mapid=?'
    const res = await query(sql, [map.point, map.time, map.date, map.type, map.distance, map.head, map.speed, map.id, map.mapid])
    if (res.affectedRows === 1) {
        console.log('update success')
    }
    ctx.body = { 'status': 'update success' }
})

router.post('/delmap', async (ctx, next) => {
    const map = ctx.request.body
    const sql = 'delete from maplist where id=? and mapid=?'
    const res = await query(sql, [map.id, map.mapid])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})
// const brr = arr.map(item => JSON.stringify(item)).toString()
module.exports = router