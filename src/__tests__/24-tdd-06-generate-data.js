// 24. Use Generated Data in Tests with tests-data-bot to Improve Test Maintainability
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {build, fake, sequence} from 'test-data-bot' // some weird package!
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-06-generate-data'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

// faker gem basically
// communicates that it doesn't matter whatever the blog post is actually called
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')), // strange regex
  // Faker actually adds an extra new line in a paragraph here. When you put that into a text area that gets stripped out. What we're going to do is we'll just make this easy and say replace all/Rs globally and replace those with an empty string. Now everything's working fine.
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`), // sequence makes sure all users are unique
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder() // postBuilder({content: 'something special}) // some way to communicate that this should not be faked!
  const preDate = new Date().getTime()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
