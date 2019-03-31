const express = require('express')
const planController = require('../controllers/planController')

function routes(Plan) {
  const planRouter = express.Router()
  const controller = planController(Plan)

  planRouter.route('/plans').get(controller.get).post(controller.post)

  planRouter.use('/plans/:id', (req, res, next) => {
    Plan.findById(req.params.id, (err, plan) => {
      if (err) {
        return res.send(err)
      }
      if (plan) {
        req.plan = plan
        return next()
      }
      return res.sendStatus(404)
    })
  })

  planRouter.route('/plans/:id').get(controller.getById)

  return planRouter
}

module.exports = routes;
