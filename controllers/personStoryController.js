function personStoryController(PersonStory) {

  function post(req, res) {
    const personStory = new PersonStory(req.body)
    if (!req.body.person_id) {
      return res.send({ code: 2003, message: 'person_id is required' })
    }
    if (!req.body.story_id) {
      return res.send({ code: 2004, message: 'story_id is required' })
    }
    if (!req.body.point) {
      return res.send({ code: 2005, message: 'point is required' })
    }
    personStory.save()

    return res.status(201).json(personStory)
  }

  function getByPersonId(req, res) {
    console.log('personn', req.params.id);
    PersonStory.findOne({ person_id: req.params.id }, (err, personStory) => {
      if (err) {
        return res.send(err)
      }
      return res.json(personStory)
    })
  }

  function patch(req, res) {

    PersonStory.findOne({ person_id: req.params.id }, (err, personStory) => {
      if (err) {
        return res.send(err)
      }
      /* eslint-disable-next-line no-underscore-dangle */
      if (personStory._id) {
        /* eslint-disable-next-line no-underscore-dangle */
        delete personStory._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        personStory[key] = value;
      });
      personStory.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(personStory);
      });
    })
  }
  return {
    getByPersonId, post, patch
  }

}

module.exports = personStoryController