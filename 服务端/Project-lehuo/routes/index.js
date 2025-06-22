const router = require('koa-router')()
const svgCaptcha = require('svg-captcha')
const jwt = require("jsonwebtoken")
const myKey = "123456789"
const { query } = require('./db')

router.get('/captcha', async (ctx, next) => {
    let options = {
        size: 4,
        noise: 2,
        color: true,
        background: "#666"
    }
    const cap = svgCaptcha.create(options)
    ctx.body = { data: cap.data, text: cap.text }
    ctx.session.captcha = cap.text
    console.log('captcha:')
    console.log(ctx.session.captcha)
})

router.post('/demotest', async (ctx, next) => {
    const data = ctx.request.body.test
    const sel = 'select * from adminlist where username=?'
    let res = await query(sel, [data.username])
    console.log(res)
    if (res[0].username == data.username) {
        if (res[0].pwd == data.pwd) {
            let token = jwt.sign({ "username": data.username, "password": data.pwd }, myKey)
            ctx.body = { token: token, status: "success pass!!", user: data.username };
        } else {
            ctx.body = 'error password!!'
        }
    } else {
        ctx.body = 'error username!!'
    }
})

module.exports = router