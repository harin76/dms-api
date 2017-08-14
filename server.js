'use strict'
const providers = require('resource-providers')

const config = require('./config')
const app = require('./app')

const mongoConfig = {
  host: config.mongo.host,
  max: 5,
  min: 1,
  timeout: 30000,
  logout: false
}

const provConfigs = [
  {name: 'db', type: 'mongo', config: mongoConfig}
]

providers.configure(provConfigs).then(() => {
  console.log('Provider config completed, starting application')
  app.listen(config.app.port, ()=> console.log('app started at', config.app.port))
})
