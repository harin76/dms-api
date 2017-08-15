'use strict'

const config = require('./config.global')

config.env = 'test'
config.mongo.db = config.mongo.db + '_test'

module.exports = config
