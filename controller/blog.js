const xss = require('xss')
const { exec } = require('../db/mysql')

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
module.exports = {
  getList
}
