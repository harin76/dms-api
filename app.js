'use strict'

const Koa = require('koa')
const mount = require('koa-mount')
const cors = require('kcors')

const config = require('./config')

const app = new Koa()

const v1 = new Koa()
v1.use(require('./services').v1)

// mount v1 service
app.use(mount('/api/v1', v1))

module.exports = app
