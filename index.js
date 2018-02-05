const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    name: '5a334oodsjkflkdsfjrt349ruf',
    number: '0dsfdsfdsfdsfdsfdsfd',
    id: 9999999999
  }
]

const formatPerson = person => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.get('/', (req, res) => {
  res.send('')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(contact => {
    response.json(contact.map(formatPerson))
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(formatPerson(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
  /*
    const id = Number(request.params.id)
    const person = persons.find(person => Number(person.id) === Number(id))
    if ( person ) {
      response.json(person.name +': '+person.number)
    } else {
      response.status(404).end()
    }*/
})

app.get('/info', (request, response) => {
  const amount = persons.length
  response.send(
    '<div><p>Puhelinluettelossa ' +
      amount +
      ' henkilön tiedot.</p><p>' +
      new Date() +
      '</p> </div>'
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(formatPerson(savedPerson))
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  /* const id = Number(request.params.id)
  persons = persons.filter(person => Number(person.id) !== Number(id))
  response.status(204).end()*/
})
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(this.formatNote(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})
