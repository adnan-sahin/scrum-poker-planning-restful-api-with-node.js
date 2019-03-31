const express = require('express')
const personStoryController = require('../controllers/personStoryController')

function routes(PersonStory) {
  const personStoryRouter = express.Router()
  const controller = personStoryController(PersonStory)

  personStoryRouter.use('/persons/:id/story', (req, res, next) => {
    req.body.person_id = req.params.id;
    return next()
  });

  personStoryRouter.route('/persons/:id/story').post(controller.post).patch(controller.patch).get(controller.getByPersonId);

  return personStoryRouter
}

module.exports = routes;
