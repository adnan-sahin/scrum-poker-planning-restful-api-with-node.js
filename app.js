const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const whitelist = ['http://192.168.1.21:8094', 'http://localhost:8094'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

mongoose
  .connect(
    'mongodb+srv://scrumpokeruser:tpMPhLEqHP43Kbxf@cluster0-l33tb.azure.mongodb.net/scrum_poker_planning?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Story = require('./models/story');
const storyRouter = require('./routes/storyRouter')(Story);

const Plan = require('./models/plan');
const planRouter = require('./routes/planRouter')(Plan);

const Person = require('./models/person');
const personRouter = require('./routes/personRouter')(Person);

app.use('/api', planRouter);
app.use('/api', storyRouter);
app.use('/api', personRouter);

app.server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
