const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'werdsf21$#'

// md5加密

function md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密
function genpassword (password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}
module.exports = {
  genpassword
}
