// 23. Test Drive Assertions with Dates in React
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-05-dates'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null), // why isn't this MockRedirect??
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce() // prime it...just do this with promise
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime() // where did getTime come from? a: built in
  // new Date() // Mon Jun 08 2020 20:17:37 GMT-0400 (Eastern Daylight Time)
  // new Date().getTime() // 1591661849858
  // right before we submit the form

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String), // this seems too loose
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime() // the date just needs to be in between pre and post
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime() // looks super convuluted
  expect(date).toBeGreaterThanOrEqual(preDate) //
  expect(date).toBeLessThanOrEqual(postDate) // fair assertion

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
