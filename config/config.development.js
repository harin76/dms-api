'use strict'

const config = require('./config.global')

config.env = 'development'
config.mongo.db = config.mongo.db + '_dev'

module.exports = config
