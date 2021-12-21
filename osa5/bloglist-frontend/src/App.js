import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const resBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(resBlog))
      showNotification(`a new blog ${title} by ${author} added!`)
    } catch (exception) {
      showNotification('Something went wrong')
      console.log(exception)
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
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
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
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            Title 
            <input
            type="text"
            value={title}
            name="title"
            onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            Author 
            <input
            type="text"
            value={author}
            name="author"
            onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url 
            <input
            type="text"
            value={url}
            name="url"
            onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App