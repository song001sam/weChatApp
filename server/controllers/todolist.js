const { mysql: config } = require('../config')
module.exports = {
  add: async ctx => {
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
    await DB("todoInfo").insert(ctx.request.query)
    ctx.state.data = "ok123"
  },
  del: async ctx => {
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
    await DB("todoInfo").where('id', ctx.request.query.id).del()
    ctx.state.data = "ok123"

  },
  finish: async ctx => {
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
    await DB("todoInfo").where('id', ctx.request.query.id).update(ctx.request.query)
    ctx.state.data = "ok123"
  },
  list: async ctx => {
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
    await DB("addInfo").where('nickName', '!=', ctx.request.query.nickName).select().then(function (rows) {
      result = rows
      return
    })
    ctx.state.data = result

  }
}