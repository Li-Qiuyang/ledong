const router = require('koa-router')()
router.prefix('/data')
const { query } = require('./db')
const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const jwt = require("jsonwebtoken")
const myKey = "123456789"
const filePath = path.join(__dirname, '../public/video')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/yoga/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/warmup/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload1 = multer({ storage: storage1 })

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/run/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload2 = multer({ storage: storage2 })

const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/ropeskipping/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload3 = multer({ storage: storage3 })

const storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/pilates/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload4 = multer({ storage: storage4 })

const storage5 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/dance/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload5 = multer({ storage: storage5 })

const storage6 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath + '/bodybuildingexercise/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload6 = multer({ storage: storage6 })

router.get('/getdata', async (ctx, next) => {
    const type = ctx.request.query.type
    if (type == 'yoga') {
        const sql = 'select * from yogalist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'warmup') {
        const sql = 'select * from warmuplist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'run') {
        const sql = 'select * from runlist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'ropeskipping') {
        const sql = 'select * from ropeskippinglist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'pilates') {
        const sql = 'select * from pilateslist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'dance') {
        const sql = 'select * from dancelist'
        const res = await query(sql, [])
        ctx.body = res
    } else if (type == 'bodybuildingexercise') {
        const sql = 'select * from bodybuildingexerciselist'
        const res = await query(sql, [])
        ctx.body = res
    } else {
        ctx.body = { 'status': 'error' }
        return false
    }
})

router.get('/getalldata', async (ctx, next) => {
    const sql = 'select * from yogalist'
    const res = await query(sql, [])
    const sql1 = 'select * from warmuplist'
    const res1 = await query(sql1, [])
    const sql2 = 'select * from runlist'
    const res2 = await query(sql2, [])
    const sql3 = 'select * from ropeskippinglist'
    const res3 = await query(sql3, [])
    const sql4 = 'select * from pilateslist'
    const res4 = await query(sql4, [])
    const sql5 = 'select * from dancelist'
    const res5 = await query(sql5, [])
    const sql6 = 'select * from bodybuildingexerciselist'
    const res6 = await query(sql6, [])
    const arr = res.concat(res1).concat(res2).concat(res3).concat(res4).concat(res5).concat(res6)
    ctx.body = arr
})

router.post('/updatedata', async (ctx, next) => {
    const type = ctx.request.query.type
    if (type == 'yoga') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update yogalist set  isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'warmup') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update warmuplist set isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?,introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'run') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update runlist set isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'ropeskipping') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update ropeskippinglist set isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'pilates') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update pilateslist set isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'dance') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update dancelist set  isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else if (type == 'bodybuildingexercise') {
        const lesson = ctx.request.body
        console.log(lesson)
        const sql = 'update bodybuildingexerciselist set isrecommend=?, lessonname=?, lessonfilename=?, lessontype=?, introduction=? where lessonid=?'
        let res = await query(sql, [lesson.isrecommend, lesson.lessonname, lesson.lessonfilename, lesson.lessontype, lesson.introduction, lesson.lessonid])
        if (res.affectedRows === 1) {
            console.log('update success')
        }
        ctx.body = { 'status': 'update success' }
    } else {
        ctx.body = { 'status': 'error' }
        return false
    }
})

router.post('/deldata', async (ctx, next) => {
    const type = ctx.request.query.type
    if (type == 'yoga') {
        const sel = 'select lessonfilename from yogalist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/yoga/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from yogalist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type == 'warmup') {
        const sel = 'select lessonfilename from warmuplist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/warmup/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from warmuplist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type == 'run') {
        const sel = 'select lessonfilename from runlist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/run/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from runlist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type == 'ropeskipping') {
        const sel = 'select lessonfilename from ropeskippinglist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/ropeskipping/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from ropeskippinglist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type = 'pilates') {
        const sel = 'select lessonfilename from pilateslist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/pilates/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from pilateslist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type == 'dance') {
        const sel = 'select lessonfilename from dancelist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/dance/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from dancelist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else if (type == 'bodybuildingexercise') {
        const sel = 'select lessonfilename from bodybuildingexerciselist where lessonid=?'
        let data = await query(sel, [ctx.request.body.id])
        fs.unlink(filePath + '/bodybuildingexercise/' + data[0].lessonfilename, function (error) {
            if (error) {
                ctx.body = { 'status': 'delete error' }
                return false
            }
        })
        const sqlStr = 'delete from bodybuildingexerciselist where lessonid=?'
        let res = await query(sqlStr, [ctx.request.body.id])
        if (res) {
            console.log('delete success')
        }
        ctx.body = { 'status': 'delete success' }
    } else {
        ctx.body = { 'status': 'error' }
        return false
    }
})

router.post('/uploadwarmup', upload1.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'w' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'WarmupLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'warmup'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into warmuplist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploadrun', upload2.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'r' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'RunLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'run'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into runlist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploadropeskipping', upload3.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'rope' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'RskippingLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'ropeskipping'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into ropeskippinglist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploadpilates', upload4.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'p' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'PliatesLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'pilates'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into pilateslist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploaddance', upload5.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'd' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'DanceLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'dance'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into dancelist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploadbodybuildingexercise', upload6.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'b' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'BodyLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'bodybuildingexercise'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into bodybuildingexerciselist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

router.post('/uploadyoga', upload.single('file'), async (ctx, next) => {
    let authorization = ctx.req.headers.authorization
    let result = jwt.verify(authorization, myKey)
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [result.username])
    if (res[0].pwd == result.password) {
        let lessonid = 'y' + Math.floor(Math.random() * 10000)
        let lessonfilename = ctx.req.file.originalname
        let lessonname = 'YogaLesson' + '.' + Math.floor(Math.random() * 10000)
        let lessontype = 'yoga'
        let isrecommend = 0
        let iscollect = 0
        const lesson = { lessonid: lessonid, lessonfilename: lessonfilename, lessonname: lessonname, lessontype: lessontype, isrecommend: isrecommend }
        const sqlStr = 'insert into yogalist (lessonid, lessonfilename, lessonname, lessontype, isrecommend) values (?, ?, ?, ?, ?)'
        const res = await query(sqlStr, [lesson.lessonid, lesson.lessonfilename, lesson.lessonname, lesson.lessontype, lesson.isrecommend])
        if (res.affectedRows == 1) {
            console.log('add success')
        }
        ctx.body = { 'status': 'add success' }
    } else {
        ctx.body = { 'status': 'token error' }
    }
})

module.exports = router