import React, { useState } from 'react'
const Blog = ({ blog, handleBlogLike, user, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)

  if(expanded) {
    return (
      <div className="blog" id="blog">
        Title: {blog.title} <button onClick={() => setExpanded(!expanded)}>view</button> <br />
        Author: {blog.author} <br />
        Url: {blog.url} <br />
        Likes: {blog.likes} <button onClick={() => handleBlogLike(blog)}>Like</button><br />
        User: {blog.user.name}
        {blog.user.username === user.username &&
          <button onClick={() => handleDelete(blog)}>Delete</button>
        }
      </div>
    )
  }
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={() => setExpanded(!expanded)}>view</button>
    </div>
  )
}

export default Blog