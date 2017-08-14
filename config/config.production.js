'use strict'

const config = require('./config.global')

config.env = 'production'
config.mongo.dbName = config.mongo.dbName + '_prod'

module.exports = config
