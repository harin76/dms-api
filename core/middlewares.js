'use strict'

const asyncBusboy = require('async-busboy')
const provider = require('resource-provider')
const GridFSBucket = require('mongodb').GridFSBucket
const ObjectID = require('mongodb').ObjectID
const to = require('await-to-js').default
const _ = require('lodash')

const gridFSUpload = async (ctx) => {
  const response = []
  const cm = provider.get('db').connectionManager
  const [connError, mongo] = await to(cm.acquire())

  if (connError) {
    throw connError
  }

  try {
    const ids = []
    const {fields} = await asyncBusboy(ctx.req, {
      onFile: async (fieldName, file, fileName, encoding, mimetype) => {
        const bucket = new GridFSBucket(mongo)
        const uploadStream = bucket.openUploadStream(
          fileName,
          {
            contentType: mimetype,
            metadata: {tenant: 'default'}
          })

        ids.push(uploadStream.id)

        file.pipe(uploadStream)
        
        // Update the metadata section with fields after streaming of the file is completed
        uploadStream.on('finish', async function() {
          const metadata = {}
          const filesColl = mongo.collection('fs.files')

          _.keys(fields).forEach((k) => {
            metadata['metadata.' + k] = fields[k]
          })

          filesColl.findOneAndUpdate({_id: ObjectID(uploadStream.id)}, {$set: metadata}, {returnOriginal:true})
        })
      }
    })

    ctx.body = {done: true, fields }
  } catch (error) {
    throw error
  } finally {
    cm.release(mongo)
  }
}

const gridFSDownload = async (ctx) => {
  const cm = provider.get('db').connectionManager

  const [connError, mongo] = await to(cm.acquire())

  if (connError) {
    throw connError
  }

  try {
    const bucket = new GridFSBucket(mongo)
    const downloadStream = bucket.openDownloadStreamByName(ctx.params.name)
    // TODO set appropriate ctx.type
    // ctx.type = 'image/png'
    ctx.body = downloadStream
  } finally {
    cm.release(mongo)
  }
}

exports.gridFSUpload = gridFSUpload
exports.gridFSDownload = gridFSDownload
