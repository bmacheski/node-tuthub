'use strict'

const path = require('path')

const MONGODB_USER   = process.env.MONGOLAB_USER || 'username'
  , MONGODB_PASSWORD = process.env.MONGOLAB_PASS || 'password'

module.exports = {
  root: path.join(__dirname, '/../..'),
  sessionSecret: process.env.SESSION_SECRET || 'supersecret',
  mongo: {
    url: process.env.MONGODB_URL || 'mongodb://' + MONGODB_USER + ':' + MONGODB_PASSWORD +
    '@ds021689.mlab.com:21689/node-tuthub'
  }
}
