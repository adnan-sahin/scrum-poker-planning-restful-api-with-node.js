const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express();

mongoose.connect('mongodb://localhost:27017/scrum_poker_planning', { useNewUrlParser: true }).then(() => {
  console.log('Connected to database!')
}).catch(err => {
  console.log(err)
})

const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const Story = require('./models/story')
const storyRouter = require('./routes/storyRouter')(Story)

const Plan = require('./models/plan')
const planRouter = require('./routes/planRouter')(Plan)

const Person = require('./models/person')
const personRouter = require('./routes/personRouter')(Person)

const PersonStory = require('./models/personStory')
const personStoryRouter = require('./routes/personStoryRouter')(PersonStory)


app.use('/api', planRouter)
app.use('/api', storyRouter)
app.use('/api', personRouter)
app.use('/api', personStoryRouter)


app.server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;

