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
  plan_id: {
    type: Schema.Types.ObjectId, ref: 'Plan',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Story', StorySchema, 'stories')