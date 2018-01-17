const { mysql: config } = require('../config')
module.exports ={add: async ctx => {
  const DB = require('knex')({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      database: config.db,
      charset: config.char,
      multipleStatements: true
    }
  })

  
  await DB("mapInfo").where('nickName', '=', ctx.request.query.nickName).update(ctx.request.query)
 
  ctx.state.data = "ok123"
},
check:async ctx => {
  const DB = require('knex')({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      database: config.db,
      charset: config.char,
      multipleStatements: true
    }
  })
  var result
  await DB("mapInfo").where('nickName', '!=', ctx.request.query.nickName).select().then(function (rows) {
    result = rows[0]
    return 
  })
  ctx.state.data = result
  
}
}