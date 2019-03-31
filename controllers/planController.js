function planController(Plan) {

  function post(req, res) {
    const plan = new Plan(req.body)
    if (!req.body.name) {
      return res.send({ code: 2003, message: 'Name is required' })
    }
    plan.save()

    return res.status(201).json(plan)
  }

  function get(req, res) {
    Plan.find((err, plans) => {
      if (err) {
        return res.send(err)
      }
      return res.json(plans)
    })
  }

  function getById(req, res) {
    return res.json(req.plan)
  }

  return {
    get, getById, post
  }

}

module.exports = planController