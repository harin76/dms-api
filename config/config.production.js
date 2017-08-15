'use strict'

const config = require('./config.global')

config.env = 'production'
config.mongo.db = config.mongo.db + '_prod'

module.exports = config
