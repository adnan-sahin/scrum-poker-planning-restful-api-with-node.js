function personController(Person) {
  function post(req, res) {
    const person = new Person(req.body);
    if (!req.body.name) {
      return res.send({ code: 2003, message: 'name is required' });
    }
    if (!req.body.plan_id) {
      return res.send({ code: 2003, message: 'plan_id is required' });
    }
    if (!req.body.story_id) {
      return res.send({ code: 2004, message: 'story_id is required' });
    }
    person.save();

    return res.status(201).json(person);
  }

  function get(req, res) {
    const query = {};

    if (req.query.plan_id) {
      query.plan_id = req.query.plan_id;
    }
    if (req.query.story_id) {
      query.story_id = req.query.story_id;
    }

    Person.find(query, (err, persons) => {
      if (err) {
        return res.send(err);
      }
      return res.json(persons);
    });
  }

  function patch(req, res) {
    const { person } = req;
    /* eslint-disable-next-line no-underscore-dangle */
    if (req.body._id) {
      /* eslint-disable-next-line no-underscore-dangle */
      delete req.body._id;
    }
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      person[key] = value;
    });
    req.person.save(err => {
      if (err) {
        return res.send(err);
      }
      return res.json(person);
    });
  }

  function getById(req, res) {
    return res.json(req.person);
  }

  return {
    get,
    getById,
    post,
    patch
  };
}

module.exports = personController;
