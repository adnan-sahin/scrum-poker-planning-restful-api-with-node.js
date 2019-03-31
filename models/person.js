const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String,
    enum: ['DEVELOPER', 'MASTER'],
    default: 'DEVELOPER'
  },
  plan_id: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  story_id: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
  point: { type: Number, default: null },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Person', personSchema, 'persons');
