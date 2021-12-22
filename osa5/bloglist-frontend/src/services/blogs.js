import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  const updateUrl = `${baseUrl}/${blog.id}`
  const response = await axios.put(updateUrl, blog)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, create, update, remove, setToken }