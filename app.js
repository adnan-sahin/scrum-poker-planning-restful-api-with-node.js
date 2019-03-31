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

app.use('/api', storyRouter)

app.server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;

