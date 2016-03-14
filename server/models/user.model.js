'use strict'

const mongoose = require('mongoose')
    , bcrypt   = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }]
})

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) throw err
    this.password = hash
    next()
  })
})

UserSchema.methods.validatePassword = function(password, cb) {
  bcrypt.compare(password, this.password, cb)
}

module.exports = mongoose.model('User', UserSchema)
