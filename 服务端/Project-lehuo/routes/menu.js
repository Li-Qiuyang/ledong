const router = require('koa-router')()
router.prefix('/menu')
const { query } = require('./db')

router.get('/getmenu', async (ctx, next) => {
    const sql = 'select * from menulist'
    const res = await query(sql, [])
    ctx.body = res
})

router.post('/uploadmenu', async (ctx, next) => {
    const sql0 = 'select left(uuid(),8) menuId'
    const res0 = await query(sql0, [])
    const menuId = res0[0].menuId
    const data = ctx.request.body
    const sql = 'insert into menulist (menuId, menuName, menuEnergy, menuSrc, foodDesc, descs, menuProtein, menuFat, menuCarbohyrate, trait) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const res = await query(sql, [menuId, data.menuName, data.menuEnergy, data.menuSrc, data.foodDesc, data.descs, data.menuProtein, data.menuFat, data.menuCarbohyrate, data.trait])
    if (res.affectedRows === 1) {
        console.log('upload success')
    }
    ctx.body = { 'status': 'upload success' }
})

router.post('/updatemenu', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'update menulist set menuName=?, menuEnergy=?, menuSrc=?, foodDesc=?, descs=?, menuProtein=?, menuFat=?, menuCarbohyrate=?, trait=? where menuId=?'
    const res = await query(sql, [data.menuName, data.menuEnergy, data.menuSrc, data.foodDesc, data.descs, data.menuProtein, data.menuFat, data.menuCarbohrate, data.trait, data.menuId])
    if (res.affectedRows === 1) {
        console.log('update success')
    }
    ctx.body = { 'status': 'update success' }
})

router.post('/delmenu', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'delete from menulist where menuId=?'
    const res = await query(sql, [data.menuId])
    if (res) {
        console.log('delete success')
    }
    ctx.body = { 'status': 'delete success' }
})

router.post('/getusermenu', async (ctx, next) => {
    const data = ctx.request.body
    const sql = 'select * from menucollectlist where userid=?'
    const res = await query(sql, [data.userid])
    ctx.body = res
})

module.exports = router