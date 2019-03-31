function personController(Person) {

  function post(req, res) {
    const person = new Person(req.body)
    if (!req.body.full_name) {
      return res.send({ code: 2003, message: 'FullName is required' })
    }
    person.save()

    return res.status(201).json(person)
  }


  function get(req, res) {
    Person.find((err, persons) => {
      if (err) {
        return res.send(err)
      }
      return res.json(persons)
    })
  }

  function getById(req, res) {
    return res.json(req.person)
  }

  return {
    get, getById, post
  }

}

module.exports = personController