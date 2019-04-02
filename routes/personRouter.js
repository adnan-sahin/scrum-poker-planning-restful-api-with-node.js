const express = require('express');
const personController = require('../controllers/personController');

function routes(Person) {
  const personRouter = express.Router();
  const controller = personController(Person);

  personRouter
    .route('/persons')
    .get(controller.get)
    .post(controller.post);

  personRouter.use('/persons/:id', (req, res, next) => {
    Person.findById(req.params.id, (err, person) => {
      if (err) {
        return res.send(err);
      }
      if (person) {
        req.person = person;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  personRouter
    .route('/persons/:id')
    .get(controller.getById)
    .patch(controller.patch);

  return personRouter;
}

module.exports = routes;
