import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ handleBlogAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleBlogAdd({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            Title
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            Author
          <input
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            Url
          <input
            type="text"
            id="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="createBtn" type="submit">Create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  handleBlogAdd: PropTypes.func.isRequired
}

export default CreateForm