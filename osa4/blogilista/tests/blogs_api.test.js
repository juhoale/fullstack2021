const mongoose = require('mongoose')
const supertest = require ('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'Eka blogi',
        author: 'Juho',
        url: 'www.blogit.com/blogs/eka',
        likes: 20
    },
    {
        title: 'Vika blogi',
        author: 'Kalle',
        url: 'www.bolgit.com/blogs/vika',
        likes: 10
    },
]
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('blog is added to the database', async () => {
    const newBlog = {
      title: "test blog",
      author: "Timothy Tester",
      url: "testing.com",
      likes: 30
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blogs => blogs.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('test blog')
  })

  test('if likes is not given, set likes to 0', async () => {
    const newBlog = {
      title: "test blog",
      author: "Timothy Tester",
      url: "testing.com" 
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
  })

  test('if title and url are missing, return with status code 400', async () => {
    const newBlog = {
      title: "",
      author: "Timothy Tester",
      url: ""
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })