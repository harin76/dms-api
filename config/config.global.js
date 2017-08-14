'use strict'

const config = {app: {}, mongo: {}}

config.env = 'development'

config.app.port = process.env.port || 3000

config.mongo.host = 'localhost'
config.mongo.dbName = 'dms_dms'

module.exports = config
