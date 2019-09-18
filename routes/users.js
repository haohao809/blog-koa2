const router = require('koa-router')()
const { login } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/users')

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
module.exports = router
