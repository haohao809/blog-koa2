const router = require('koa-router')()
const { login, register, checkuser } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/users')
// 登录路由
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const loginData = await login(username, password)

  if (loginData.username) {
    ctx.session.username = loginData.username
    ctx.session.realname = loginData.realname

    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

// 注册路由
router.post('/register', async function (ctx, next) {
  const { username, password, realname } = ctx.request.body
  const registerData = await register(username, password, realname)

  if (registerData.id) {
    ctx.body = new SuccessModel(registerData)
    return
  }
  ctx.body = new ErrorModel('注册失败')
})
// 查询注册用户信息
router.get('/checkuser', async function (ctx, next) {
  const userdata = await checkuser()
  ctx.body = new SuccessModel(userdata)
})
module.exports = router
