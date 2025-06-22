const router = require('koa-router')()
router.prefix('/collect')
const { query } = require('./db')

router.get('/getdata', async (ctx, next) => {
    const sql = 'select * from collectlist'
    const res = await query(sql, [])
    ctx.body = res
})

router.post('/getpraticetime', async (ctx, next) => {
    const collect = ctx.request.body
    const datalist = []
    const sql = 'select * from collectlist where userId=?'
    const res = await query(sql, [collect.userId])
    for (let i = 0; i < res.length; i++) {
        if (res[i].videoType == 'yoga') {
            const sql1 = 'select * from yogalist where lessonid=?'
            const res1 = await query(sql1, [res[i].videoId])
            datalist.push({ lesson: res1, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'warmup') {
            const sql2 = 'select * from warmuplist where lessonid=?'
            const res2 = await query(sql2, [res[i].videoId])
            datalist.push({ lesson: res2, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'run') {
            const sql3 = 'select * from runlist where lessonid=?'
            const res3 = await query(sql3, [res[i].videoId])
            datalist.push({ lesson: res3, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'ropeskipping') {
            const sql4 = 'select * from ropeskippinglist where lessonid=?'
            const res4 = await query(sql4, [res[i].videoId])
            datalist.push({ lesson: res4, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'pilates') {
            const sql5 = 'select * from pilateslist where lessonid=?'
            const res5 = await query(sql5, [res[i].videoId])
            datalist.push({ lesson: res5, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'dance') {
            const sql6 = 'select * from dancelist where lessonid=?'
            const res6 = await query(sql6, [res[i].videoId])
            datalist.push({ lesson: res6, time: res[i].time, date: res[i].date, type: res[i].videoType })
        } else if (res[i].videoType == 'bodybuildingexercise') {
            const sql7 = 'select * from bodybuildingexerciselist where lessonid=?'
            const res7 = await query(sql7, [res[i].videoId])
            datalist.push({ lesson: res7, time: res[i].time, date: res[i].date, type: res[i].videoType })
        }
    }
    ctx.body = { data: datalist }
})

router.post('/getlesson', async (ctx, next) => {
    const user = ctx.request.body
    const collected = []
    const sql = 'select * from lessoncollectlist where userid=?'
    const res = await query(sql, [user.userid])
    for (let i = 0; i < res.length; i++) {
        if (res[i].lessontype == 'yoga') {
            const sql1 = 'select * from yogalist where lessonid=?'
            const res1 = await query(sql1, [res[i].lessonid])
            collected.push(res1)
        } else if (res[i].lessontype == 'warmup') {
            const sql2 = 'select * from warmuplist where lessonid=?'
            const res2 = await query(sql2, [res[i].lessonid])
            collected.push(res2)
        } else if (res[i].lessontype == 'run') {
            const sql3 = 'select * from runlist where lessonid=?'
            const res3 = await query(sql3, [res[i].lessonid])
            collected.push(res3)
        } else if (res[i].lessontype == 'ropeskipping') {
            const sql4 = 'select * from ropeskippinglist where lessonid=?'
            const res4 = await query(sql4, [res[i].lessonid])
            collected.push(res4)
        } else if (res[i].lessontype == 'pilates') {
            const sql5 = 'select * from pilateslist where lessonid=?'
            const res5 = await query(sql5, [res[i].lessonid])
            collected.push(res5)
        } else if (res[i].lessontype == 'dance') {
            const sql6 = 'select * from dancelist where lessonid=?'
            const res6 = await query(sql6, [res[i].lessonid])
            collected.push(res6)
        } else if (res[i].lessontype == 'bodybuildingexercise') {
            const sql7 = 'select * from bodybuildingexerciselist where lessonid=?'
            const res7 = await query(sql7, [res[i].lessonid])
            collected.push(res7)
        }
    }
    ctx.body = { collectlesson: collected }

})

router.post('/collectlesson', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'insert into lessoncollectlist (userid, lessonid, lessontype) values (?, ?, ?)'
    const res = await query(sql, [data.userid, data.lessonid, data.lessontype])
    if (res.affectedRows === 1) {
        console.log('collect success')
    }
    ctx.body = { 'status': 'collect success' }
})

router.post('/collectmenu', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'insert into menucollectlist (userid, menuid) values (?, ?)'
    const res = await query(sql, [data.userid, data.menuid])
    if (res.affectedRows === 1) {
        console.log('collect success')
    }
    ctx.body = { 'status': 'collect success' }
})

router.post('/ptupdate', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'update collectlist set time=?, date=?, videoType=? where userId=? and videoId=?'
    let res = await query(sql, [data.time, data.date, data.videoType, data.userId, data.videoId])
    if (res.affectedRows === 1) {
        console.log('update success')
    }
    ctx.body = { 'status': 'update success' }
})

router.post('/ptinsert', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'insert into collectlist (videoId, time, date, videoType, userId) values (?, ?, ?, ?, ?)'
    let res = await query(sql, [data.videoId, data.time, data.date, data.videoType, data.userId])
    if (res.affectedRows === 1) {
        console.log('insert success')
    }
    ctx.body = { 'status': 'insert success' }
})

router.post('/ptdel', async (ctx, next) => {
    const user = ctx.request.body
    const sql = 'delete from collectlist where userId=? and videoId=?'
    const res = query(sql, [user.userid, user.videoId])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

router.post('/uncollectlesson', async (ctx, next) => {
    const lesson = ctx.request.body
    const sql = 'delete from lessoncollectlist where userid=? and lessonid=?'
    const res = query(sql, [lesson.userid, lesson.lessonid])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

router.post('/uncollectmenu', async (ctx, next) => {
    const menu = ctx.request.body
    const sql = 'delete from menucollectlist where userid=? and menuid=?'
    const res = query(sql, [menu.userid, menu.menuid])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

module.exports = router