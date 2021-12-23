import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => {return b.likes - a.likes}))
    )}, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      const blogCreator = {
        username: user.username,
        name: user.name
      }
      newBlog.user = blogCreator
      createFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
    } catch (exception) {
      showNotification('Something went wrong')
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      blogObject.likes += 1
      const likedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog))
      setBlogs(blogs.sort((a,b) => {return b.likes - a.likes}))
    } catch (exception) {
      showNotification('Something went wrong')
    }
  }

  const deleteBlog = async (delBlog) => {
    try {
      const confirm = window.confirm(`Are you sure you want to delete ${delBlog.title} by ${delBlog.author}?`)
      if(confirm) {
        await blogService.remove(delBlog.id)
        setBlogs(blogs.filter((blog) => {return blog.id !== delBlog.id}))
        showNotification('Blog deleted')
      }
    } catch (exception) {
      showNotification('Something went wrong')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="loginBtn">Login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>Log out</button>
      <div>
        <Notification message={message}/>
      </div>
      <Togglable buttonLabel='Create new blog' ref={createFormRef}>
        <CreateForm handleBlogAdd={addBlog}/>
      </Togglable>
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleBlogLike={likeBlog} user={user} handleDelete={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App