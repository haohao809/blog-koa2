const { genpassword } = require('../utils/crypto')
const { exec, escape } = require('../db/mysql')

const login = async (username, password) => {
  username = escape(username)

  password = genpassword(password)
  password = escape(password)

  const sql = `select username,realname from users where username=${username} and password=${password};`
  const rows = await exec(sql)

  return rows[0] || {}
}

const register = async (username, password, realname) => {
  username = escape(username)
  realname = escape(realname)
  password = genpassword(password)

  password = escape(password)
  const sql = `insert into users (username, password, realname) values ( ${username},${password},${realname});`
  const insertData = await exec(sql)

  return {
    id: insertData.insertId
  }
}
module.exports = {
  login,
  register
}
