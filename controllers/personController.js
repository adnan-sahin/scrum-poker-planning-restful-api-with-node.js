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

  function getById(req, res) {
    return res.json(req.person);
  }

  return {
    get,
    getById,
    post
  };
}

module.exports = personController;
