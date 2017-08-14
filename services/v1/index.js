'use strict'

const Router = require('koa-router')

const router = new Router()

require('./documents').register(router)

module.exports = router.middleware()
