const router = require('koa-router')()
router.prefix('/food')
const { query } = require('./db')

router.get('/getfood', async (ctx, next) => {
    const sql = 'select * from foodlist'
    const res = await query(sql, [])
    ctx.body = res
})

router.post('/insertfood', async (ctx, next) => {
    const sql0 = 'select left(uuid(),8) foodId'
    const res0 = await query(sql0, [])
    const foodId = res0[0].foodId
    const data = ctx.request.body
    const sql = 'insert into foodlist (foodId, foodName, foodEnergy, foodSrc, foodProtein, foodFat, foodCarbohyrate, type) values(?, ?, ?, ?, ?, ?, ?, ?)'
    const res = await query(sql, [foodId, data.foodName, data.foodEnergy, data.foodSrc, data.foodProtein, data.foodFat, data.foodCarbohyrate, data.type])
    if (res.affectedRows === 1) {
        console.log('insert success')
    }
    ctx.body = { 'status': 'insert success' }
})

router.post('/delfood', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'delete from foodlist where foodId=?'
    const res = await query(sql, [data.foodId])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

router.post('/updatefood', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'update foodlist set foodName=?, foodEnergy=?, foodSrc=?, foodProtein=?, foodFat=?, foodCarbohyrate=?, type=? where foodId=?'
    const res = await query(sql, [data.foodName, data.foodEnergy, data.foodSrc, data.foodProtein, data.foodFat, data.foodCarbohyrate, data.type, data.foodId])
    if (res.affectedRows === 1) {
        console.log('update success')
    }
    ctx.body = { 'status': 'update success' }
})

router.post('/getdayfood', async (ctx, next) => {
    const user = ctx.request.body
    const sql = 'select * from dayfoodlist where userid=? and date=?'
    const res = await query(sql, [user.userid, user.date])
    ctx.body = res
})

router.post('/uploaddayfood', async (ctx, next) => {
    const user = ctx.request.body
    const sql = 'insert into dayfoodlist (userid, title, foodName, weight, foodEnergy, foodProtein, foodFat, foodCarbohyrate, foodSrc, date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const res = await query(sql, [user.userid, user.title, user.foodName, user.weight, user.foodEnergy, user.foodProtein, user.foodFat, user.foodCarbohyrate, user.foodSrc, user.date])
    if (res.affectedRows === 1) {
        console.log('insert success')
    }
    ctx.body = { 'status': 'insert success' }
})
module.exports = router