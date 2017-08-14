'use strict'

const asyncBusboy = require('async-busboy')
const providers = require('resource-providers')
const GridFSBucket = require('mongodb').GridFSBucket
const to = require('await-to-js').default

const gridFSUpload = async (ctx) => {
  const response = []
  const {fields} = await asyncBusboy(ctx.req, {
    onFile: async (fieldName, file, fileName, encoding, mimetype) => {
      const cm = providers.get('db').connectionManager()
      console.log(providers.get('db'), cm)
      const [connError, mongo] = await to(cm.acquire())

      if (connError) {
        throw connError
      }

      try {
        const bucket = new GridFSBucket(mongo)
        const uploadStream = bucket.openUploadStream(fileName, {contentType: mimetype})
        file.pipe(uploadStream)
      } finally {
        cm.release(mongo)
      }

    }
  })
  ctx.body = {done: true, fields}
}

const gridFSDownload = async (ctx) => {
  const cm = providers.get('db').connectionManager

  const [connError, mongo] = await to(cm.acquire())

  if (connError) {
    throw connError
  }

  try {
    bucket = new GridFSBucket(mongo)
    const downloadStream = bucket.openDownloadStream(ctx.params.name)
    // TODO set appropriate ctx.type
    // ctx.type = 'image/png'
    ctx.body = downloadStream
  } finally {
    cm.release(mongo)
  }
}

exports.gridFSUpload = gridFSUpload
exports.gridFSDownload = gridFSDownload
