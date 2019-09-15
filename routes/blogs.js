const router = require('koa-router')()

router.prefix('/api/blogs')

router.get('/list', function (ctx, next) {
  const query = ctx.query;
  ctx.body = {
      errorCode: 0,
      query,
      data:[]
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router