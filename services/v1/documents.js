'use strict'
const middlewares = require('../../core/middlewares')


exports.register = (router) => {
  router.post('/documents/upload', middlewares.gridFSUpload)
  router.get('/documents/:name', middlewares.gridFSDownload)
}
