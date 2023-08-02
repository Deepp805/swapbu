require('dotenv').config()
const Post = require('./models/posts')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())
var morgan = require('morgan')
app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>asdf</h1>')
})

app.get('/api/posts', (request, response) => {
    Post.find({}).then(posts => {
      response.json(posts)
    })
  })

app.post('/api/post', (request, response) => {
    const body = request.body
  
    // if (body.content === undefined) {
    //   return response.status(400).json({ error: 'content missing' })
    // }
  
    const post = new Post({
        email: body.email,
        Spots_Available: body.Spots_Available,
        Dorm: body.Dorm,
        Room_Number: body.Room_Number,
        Room_Type: body.Room_Type,
        Room_Capacity: body.Room_Capacity,
    })
  
    post.save().then(savedPost => {
      response.json(savedPost)
    })
  })

app.get('/api/posts/:id', (request, response, next) => {
  Post.findById(request.params.id)
    .then(post => {
      if (post) {
        response.json(post)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/posts/:id', (request, response, next) => {
    Post.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

app.put('/api/posts/:id', (request, response, next) => {
  const body = request.body

  const post = {
    email: body.email,
    Spots_Available: body.Spots_Available,
    Dorm: body.Dorm,
    Room_Number: body.Room_Number,
    Room_Type: body.Room_Type,
    Room_Capacity: body.Room_Capacity,
    }

  Post.findByIdAndUpdate(request.params.id, post, { new: true })
    .then(updatedPost => {
      response.json(updatedPost)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})