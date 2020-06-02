// 21 of 41 Test Drive the API Call of a React Form with React Testing Library

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {savePost as mockSavePost} from '../api' // yup mockSavePost, don't want to http
import {Editor} from '../post-editor-03-api'

jest.mock('../api') // again everything from here gets mocked

afterEach(() => {
  jest.clearAllMocks() // so tests remain isolated
})

test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce() // again I don't get why you have this pre-resolved
  /*
    "Hey, mockSavePost, when you're called, I want you to mockResolvedValueOnce." 
     We don't really have a value that we're going to resolve to right now. 
     We'll just leave that blank.

     The key here is that it's returning a promise that resolves. 
     Here, we are mocking that.

     async function savePost(postData) {
       await sleep(1000)
       return {data: {post: postData}}
     }
  */

  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />) // I follow
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  } // the ol' blog post
  getByLabelText(/title/i).value = fakePost.title // what is this?? why don't you just fireEvent?
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ') // I guess fireEvent is a bit awkward for this??
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled() // from jestDOM

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1) // everything makes sense except for mockResolvedValueOnce
  // I understand cause it's a promise but...
})
