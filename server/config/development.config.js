'use strict';

const path = require('path');

module.exports = {
  root: path.join(__dirname, '/../..'),
  mongo: {
   url: 'mongodb://localhost:27017/tut-hub'
  },
  sessionSecret: process.env.SESSION_SECRET || 'supersecret'
}
