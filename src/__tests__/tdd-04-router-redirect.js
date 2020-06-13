// 22. Test Drive Mocking react-router’s Redirect Component on a Form Submission
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router' // Mock redirect!
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-04-router-redirect'

// pretty crazy way to mock a <ReactComponent />
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null), // don't really care what it's rendering...
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce() // basically priming the mockSavePost since it's async
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  // yeah getting pretty complex...
  // why is it async?
  // wait for MockRedirect to be called.
  // literally, WAIT for MockRedirect to get called
  // and when it does, check to see it got called with to: '/'
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})

/*
We updated our test to be async so that we can use the wait utility 
from React testing library and we await that wait utility with a call back 
here to basically wait until the redirect is called with props that have 
two at slash which would take the user to home.

All functioning components were actually called with a second arguments
and that's the context which we'll just leave as an empty object here. 
We're also going to say that this was called times once.
*/
