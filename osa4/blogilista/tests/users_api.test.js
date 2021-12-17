const mongoose = require('mongoose')
const supertest = require ('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        username: "Juho",
        name: "Juho A",
        passwordHash: "salasana"
    },
    {
        username: "Timo",
        name: "Timo T",
        passwordHash: "anasalas"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

test('Username must be unique', async () => {
    const newUser = {
        username: "Juho",
        name: "test",
        password: "password"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
})

test('Password must be minimum 3 characters long', async () => {
    const newUser = {
        username: "Testi",
        name: "test",
        password: "pw"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
  })