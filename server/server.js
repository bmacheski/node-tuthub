'use strict'

const express = require('express')
  , app       = express()

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log('✔ Server listening on port:', port))

require('./config/server.config.js')(app, express)
