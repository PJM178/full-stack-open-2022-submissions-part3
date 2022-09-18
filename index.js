const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('body', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    else {
        return " "
    }
  })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let data = [
        { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
    ]

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const currentTime = new Date()
    const info = `Phonebook has info for ${data.length} people<br/><br/>${currentTime}`
    response.send(info)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const duplicate = data.find(person => person.name.toLowerCase() === body.name.toLowerCase())

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing fields'
        })
    }
    else if (duplicate) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number
    }

    data = data.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})