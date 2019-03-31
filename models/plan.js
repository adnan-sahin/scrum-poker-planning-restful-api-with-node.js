const mongoose = require('mongoose')

const Schema = mongoose.Schema

const planSchema = new Schema({
  name: {
    type: String,
    maxlength: 200,
    required: true
  },
  votersCount: {
    type: Number,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model('Plan', planSchema, 'plans')