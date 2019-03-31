const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  point: {
    type: Number
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('stories', StorySchema)