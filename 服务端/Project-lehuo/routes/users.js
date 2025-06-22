const router = require('koa-router')()
router.prefix('/users')
const { query } = require('./db')

router.get('/getusers', async (ctx, next) => {
  const sql = 'select * from userlist'
  const res = await query(sql, [])
  ctx.body = res
})

router.post('/userregister', async (ctx, next) => {
  const user = ctx.request.body
  const sql0 = 'select * from userlist where userid=?'
  const res0 = await query(sql0, [user.userid])
  if (res0[0] == undefined) {
    const sql = 'insert into userlist (userid, username, avatar, signature) values (?,?,?,?)'
    let res = await query(sql, [user.userid, user.username, user.avatar, user.signature])
    if (res.affectedRows === 1) {
      console.log('register success')
    }
    ctx.body = { 'status': 'register success' }
  } else {
    ctx.body = { 'status': 'register error userid is registered' }
  }
})

router.post('/userlogin', async (ctx, next) => {
  const user = ctx.request.body
  const sql = 'select * from userlist where userid=?'
  const res = await query(sql, [user.userid])
  if (res[0] !== undefined) {
    ctx.body = { 'status': 'login success', 'user': res }
  } else {
    ctx.body = { 'status': 'user is undefined' }
  }
})

router.post('/userupdate', async (ctx, next) => {
  const user = ctx.request.body
  console.log(user)
  const sql = 'update userlist set username=?, avatar=?, region=?, date=?, signature=?, sex=?, fans=?, concern=?, height=?, weight=? where userid=?'
  let res = await query(sql, [user.username, user.avatar, user.region, user.date, user.signature, user.sex, user.fans, user.concern, user.height, user.weight, user.userid])
  if (res.affectedRows === 1) {
    console.log('update success')
  }
  ctx.body = { 'status': 'update success' }
})

router.post('/deluser', async (ctx, next) => {
  const userid = ctx.request.body.userid
  const sql = 'delete from userlist where userid=?'
  const res = query(sql, [userid])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.get('/getallfans', async (ctx, next) => {
  const sql = 'select * from fanslist'
  const res = await query(sql, [])
  ctx.body = res
})

router.post('/getconcern', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from fanslist where fansId=?'
  const res = await query(sql, [data.fansId])
  const sql1 = 'select * from userlist where userid=?'
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const res1 = await query(sql1, [res[i].userId])
    arr.push({ concern: res1, data: res[i] })
  }
  ctx.body = arr
})

router.post('/concern', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'insert into fanslist (userId, fansId) values (?, ?)'
  const res = await query(sql, [data.userId, data.fansId])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/unconcern', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from fanslist where userId=? and fansId=?'
  const res = query(sql, [data.userId, data.fansId])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.get('/getallcs', async (ctx, next) => {
  const sql = 'select * from contentlist'
  const res = await query(sql, [])
  ctx.body = res
})

router.get('/getallcontent', async (ctx, next) => {
  const sql = 'select * from contentlist'
  const res = await query(sql, [])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].userId])
    const sql2 = 'select * from user1list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user2list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user3list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    arr.push({ user: res1, data: res[i], comment: res2.length, like: res3.length, likedata: res3, forward: res4.length })
  }
  ctx.body = arr
})

router.post('/getfans', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from fanslist where userId=?'
  const res = await query(sql, [data.userId])
  const sql1 = 'select * from userlist where userid=?'
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const res1 = await query(sql1, [res[i].fansId])
    arr.push({ fans: res1, data: res[i] })
  }
  ctx.body = arr
})

router.post('/getcontent', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from contentlist where userId=?'
  const res = await query(sql, [data.userId])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].userId])
    const sql2 = 'select * from user1list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user2list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user3list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    arr.push({ user: res1, data: res[i], comment: res2.length, like: res3.length, likedata: res3, forward: res4.length })
  }
  ctx.body = arr
})

router.post('/uploadcontent', async (ctx, next) => {
  const sql0 = 'select left(uuid(),8) postId'
  const res0 = await query(sql0, [])
  const postId = res0[0].postId
  const data = ctx.request.body
  const sql = 'insert into contentlist (userId, content, time, postId, imgs, title, address) values (?, ?, ?, ?, ?, ?, ?)'
  const res = await query(sql, [data.userId, data.content, data.time, postId, data.imgs, data.title])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/updatecontent', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'update contentlist set content=?, time=?, imgs=?, title=? ,address=? where userId=? and postId=?'
  const res = await query(sql, [data.content, data.time, data.imgs, data.title, data.address, data.userId, data.postId])
  if (res.affectedRows === 1) {
    console.log('update success')
  }
  ctx.body = { 'status': 'update success' }
})

router.post('/delcontent', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from contentlist where userId=? and postId=?'
  const res = query(sql, [data.userId, data.postId])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/getcomment', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user1list where userId=?'
  const res = await query(sql, [data.userId])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].userId])
    const sql2 = 'select * from user1list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user2list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user3list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    const sql5 = 'select * from userlist where userid=?'
    const res5 = await query(sql5, [res[i].user2Id])
    const sql6 = 'select * from contentlist where postId=?'
    const res6 = await query(sql6, [res[i].postId])
    arr.push({ user: res1, user2: res5, data: res[i], comment: res2.length, like: res3.length, likedata: res3, forward: res4.length, content: res6 })
  }
  ctx.body = arr
})

router.post('/postcomment', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user1list where postId=?'
  const res = await query(sql, [data.postId])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].user2Id])
    arr.push({ user2: res1, data: res[i] })
  }
  ctx.body = arr
})

router.post('/comment', async (ctx, next) => {
  const sql0 = 'select left(uuid(),8) commentid'
  const res0 = await query(sql0, [])
  const commentid = res0[0].commentid
  const data = ctx.request.body
  const sql = 'insert into user1list (userId, postId, user2Id, discussContent, time, commentid) values (?, ?, ?, ?, ?, ?)'
  const res = await query(sql, [data.userId, data.postId, data.user2Id, data.discussContent, data.time, commentid])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/delcomment', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from user1list where userId=? and postId=? and user2Id=? and commentid=?'
  const res = query(sql, [data.userId, data.postId, data.user2Id, data.commentid])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/userdel', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from user1list where userId=? and postId=?'
  const res = await query(sql, [data.userId, data.postId])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/getlike', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user2list where userId=?'
  const res = await query(sql, [data.userId])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].userId])
    const sql2 = 'select * from user1list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user2list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user3list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    const sql5 = 'select * from userlist where userid=?'
    const res5 = await query(sql5, [res[i].user2Id])
    const sql6 = 'select * from contentlist where postId=?'
    const res6 = await query(sql6, [res[i].postId])
    arr.push({ user: res1, user2: res5, data: res[i], comment: res2.length, like: res3.length, likedata: res3, forward: res4.length, content: res6 })
  }
  ctx.body = arr
})

router.post('/like', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'insert into user2list (userId, postId, user2Id, time) values (?, ?, ?, ?)'
  const res = await query(sql, [data.userId, data.postId, data.user2Id, data.time])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/postlike', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user2list where postId=?'
  const res = await query(sql, [data.postId])
  ctx.body = res
})

router.post('/dislike', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from user2list where userId=? and postId=? and user2Id=?'
  const res = query(sql, [data.userId, data.postId, data.user2Id])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/dellike', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from user2list where userId=? and postId=?'
  const res = query(sql, [data.userId, data.postId])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/getforward', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user3list where userId=?'
  const res = await query(sql, [data.userId])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].user2Id])
    const sql2 = 'select * from user3list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user1list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user2list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    const sql5 = 'select * from contentlist where postId=?'
    const res5 = await query(sql5, [res[i].postId])
    arr.push({ user: res1, forward: res2.length, comment: res3.length, like: res4.length, content: res5, data: res[i] })
  }
  ctx.body = arr
})

router.post('/user2forward', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from user3list where user2Id=?'
  const res = await query(sql, [data.user2Id])
  const arr = []
  for (let i = 0; i < res.length; i++) {
    const sql1 = 'select * from userlist where userid=?'
    const res1 = await query(sql1, [res[i].userId])
    const sql2 = 'select * from user3list where postId=?'
    const res2 = await query(sql2, [res[i].postId])
    const sql3 = 'select * from user1list where postId=?'
    const res3 = await query(sql3, [res[i].postId])
    const sql4 = 'select * from user2list where postId=?'
    const res4 = await query(sql4, [res[i].postId])
    const sql5 = 'select * from contentlist where postId=?'
    const res5 = await query(sql5, [res[i].postId])
    arr.push({ user: res1, forward: res2.length, comment: res3.length, like: res4.length, content: res5, data: res[i] })
  }
  ctx.body = arr
})

router.post('/forward', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'insert into user3list (userId, postId, user2Id, time) values (?, ?, ?, ?)'
  const res = await query(sql, [data.userId, data.postId, data.user2Id, data.time])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/unforward', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from user3list where userId=? and postId=? and user2Id=?'
  const res = query(sql, [data.userId, data.postId, data.user2Id])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.get('/getallschedule', async (ctx, next) => {
  const sql = 'select * from schedulelist'
  const res = await query(sql, [])
  ctx.body = res
})

router.post('/getschedule', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'select * from schedulelist where userId=?'
  const res = await query(sql, [data.userId])
  ctx.body = res
})

router.post('/uploadschedule', async (ctx, next) => {
  const sql0 = 'select left(uuid(),8) sId'
  const res0 = await query(sql0, [])
  const sId = res0[0].sId
  const data = ctx.request.body
  const sql = 'insert into schedulelist (userId, name, date, isDone, sId) values(?, ?, ?, ?, ?)'
  const res = await query(sql, [data.userId, data.name, data.date, data.isDone, sId])
  if (res.affectedRows === 1) {
    console.log('insert success')
  }
  ctx.body = { 'status': 'insert success' }
})

router.post('/delschedule', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'delete from schedulelist where userId=? and sId=?'
  const res = await query(sql, [data.userId, data.sId])
  if (res) {
    console.log('delete success')
  }
  ctx.body = { 'status': 'delete success' }
})

router.post('/updateisdone', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'update schedulelist set isDone=? where userId=? and sId=?'
  const res = await query(sql, [data.isDone, data.userId, data.sId])
  if (res.affectedRows === 1) {
    console.log('update success')
  }
  ctx.body = { 'status': 'update success' }
})

router.post('/updateschedule', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'update schedulelist set date=?, name=? where userId=? and sId=?'
  const res = await query(sql, [data.date, data.name, data.userId, data.sId])
  if (res.affectedRows === 1) {
    console.log('update success')
  }
  ctx.body = { 'status': 'update success' }
})

router.post('/updatetag', async (ctx, next) => {
  const data = ctx.request.body
  const sql = 'update userlist set tag=? where userid=?'
  const res = await query(sql, [data.tag, data.userid])
  if (res.affectedRows === 1) {
    console.log('update success')
  }
  ctx.body = { 'status': 'update success' }
})

module.exports = router