const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const personStorySchema = new Schema({
  person_id: { type: Schema.Types.ObjectId, ref: 'Person' },
  story_id: { type: Schema.Types.ObjectId, ref: 'Story' },
  point: { type: Number, required: true }
})

module.exports = mongoose.model('PersonStory', personStorySchema, "personStories")