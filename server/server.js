'use strict';

const express   = require('express')
    , mongoose  = require('mongoose')
    , app       = express()
    , config    = require('./config/environment')();

mongoose.connect(config.mongo.url);
mongoose.connection.on('error', (err) => console.log('Mongoose connection error:' + err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log('✔ Server listening on port:', port));

require('./config/server.config.js')(app, express);
