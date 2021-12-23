import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blogs title and author', () => {
  const blog = {
    title: 'Testauksen alkeet',
    author: 'Timo Testaaja',
    url: 'testit.com/blogs/testit',
    likes: 20
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testauksen alkeet'
  )

  expect(component.container).toHaveTextContent(
    'Timo Testaaja'
  )

  expect(component.container).not.toHaveTextContent(
    '20'
  )

  expect(component.container).not.toHaveTextContent(
    'testit.com/blogs/testit'
  )
})

test('on button click expand and also show url and likes', () => {
  const blog = {
    title: 'Testauksen alkeet',
    author: 'Timo Testaaja',
    url: 'testit.com/blogs/testit',
    likes: 20,
    user: {
      username: 'Timppa',
      name: 'Timo Testaaja'
    }
  }

  const user = {
    username: 'Timppa'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testit.com/blogs/testit'
  )

  expect(component.container).toHaveTextContent(
    '20'
  )
})

test('two like clicks calls the event twice ', () => {
  const blog = {
    title: 'Testauksen alkeet',
    author: 'Timo Testaaja',
    url: 'testit.com/blogs/testit',
    likes: 20,
    user: {
      username: 'Timppa',
      name: 'Timo Testaaja'
    }
  }

  const user = {
    username: 'Timppa'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleBlogLike={mockHandler}/>
  )

  const expandBtn = component.getByText('view')
  fireEvent.click(expandBtn)

  const likeButn = component.getByText('Like')
  fireEvent.click(likeButn)
  fireEvent.click(likeButn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})