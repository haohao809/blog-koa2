const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blogs')
// 路由获取博客列表
router.get('/list', loginCheck, async function (ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if (ctx.query.isadmin) {
    console.log('is admin')
    if (ctx.session.username == null) {
      console.error('is admin, but no login')
      ctx.body = new ErrorModel('未登录')
      return
    }
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)

  ctx.body = new SuccessModel(listData)
})
// 路由请求博客详情
router.get('/detail', async (ctx, next) => {
  const detailData = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(detailData)
})
// 路由新建博客

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const newData = await newBlog(body)
  ctx.body = new SuccessModel(newData)
})
// 更新博客
router.post('/update', loginCheck, async (ctx, next) => {
  const data = await updateBlog(ctx.query.id, ctx.request.body)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})
// 删除博客
router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const data = await delBlog(ctx.query.id, author)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
