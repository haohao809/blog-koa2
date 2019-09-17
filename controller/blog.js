const xss = require('xss')
const { exec } = require('../db/mysql')
// 获取博客列表
const getList = async (author, keyword) => {
  let sql = 'select * from blogs where 1=1'
  if (author) {
    sql += `and author=${author}`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += 'order by createtime desc;'

  return await exec(sql)
}
// 获取博客详情
const getDetail = async (id) => {
  const sql = `select * from blogs where id = '${id}'`
  const rows = await exec(sql)
  return rows[0]
}
// 新建博客
const newBlog = async (blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `insert into blogs (title, content, createtime, author) values ('${title}','${content}',${createTime},'${author}')`
  const insertData = await exec(sql)

  return {
    id: insertData.insertId
  }
}
// 更新博客
const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}'`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
module.exports = {
  getList,
  getDetail,
  updateBlog,
  newBlog
}
