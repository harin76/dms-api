'use strict'

const config = {app: {}, mongo: {}}

config.env = 'development'

config.app.port = process.env.port || 3000

config.mongo.host = 'localhost'
config.mongo.db = 'dms'

module.exports = config
