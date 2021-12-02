const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const first = blogs[0]
    const favourite = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current, first)
    return favourite
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }