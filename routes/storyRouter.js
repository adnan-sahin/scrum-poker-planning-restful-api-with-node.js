const express = require('express');
const storyController = require('../controllers/storyController');

function routes(Story) {
  const storyRouter = express.Router()
  const controller = storyController(Story)

  storyRouter.route('/stories').get(controller.get).post(controller.post)

  storyRouter.use('/stories/:id', (req, res, next) => {
    Story.findById(req.params.id, (err, story) => {
      if (err) {
        return res.send(err)
      }
      if (story) {
        req.story = story;
        return next()
      }
      return res.sendStatus(404)
    })
  })

  storyRouter.route('/stories/:id')
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteStory);

  return storyRouter;
}

module.exports = routes;



