function storyController(Story) {
  function post(req, res) {
    const story = new Story(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send({ code: 1002, message: 'Title is required.' });
    }
    if (!req.body.plan_id) {
      res.status(400);
      return res.send({ code: 1002, message: 'Plan id is required.' });
    }
    story.save();
    return res.status(201).json(story);
  }

  function get(req, res) {
    const query = {};

    if (req.query.plan_id) {
      query.plan_id = req.query.plan_id;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }

    Story.find(query, (err, stories) => {
      if (err) {
        return res.send(err);
      }
      const mappedStories = stories.map(story => {
        const newStory = story.toJSON();
        newStory.links = {};
        newStory.links.self = `http://${req.headers.host}/api/stories/${story._id}`;
        return newStory;
      });
      return res.json(mappedStories);
    });
  }

  function getById(req, res) {
    return res.json(req.story);
  }

  function put(req, res) {
    const { story } = req;
    story.title = req.body.title;
    story.point = req.body.point;
    story.status = req.body.status;
    req.story.save(err => {
      if (err) {
        return res.send(err);
      }
      return res.json(story);
    });
  }

  function patch(req, res) {
    const { story } = req;
    /* eslint-disable-next-line no-underscore-dangle */
    if (req.body._id) {
      /* eslint-disable-next-line no-underscore-dangle */
      delete req.body._id;
    }
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      story[key] = value;
    });
    req.story.save(err => {
      if (err) {
        return res.send(err);
      }
      return res.json(story);
    });
  }

  function deleteStory(req, res) {
    req.story.remove(err => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return {
    get,
    getById,
    post,
    put,
    patch,
    deleteStory
  };
}

module.exports = storyController;
