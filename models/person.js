const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const personSchema = new Schema({
  full_name: {
    type: String
  },
  type: {
    type: String,
    enum: ['DEVELOPER', 'MASTER'],
    default: 'DEVELOPER'
  }
})

module.exports = mongoose.model('Person', personSchema, 'persons')