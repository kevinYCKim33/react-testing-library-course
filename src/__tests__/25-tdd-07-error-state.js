// 25. Test Drive Error State with React Testing Library
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {build, fake, sequence} from 'test-data-bot'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-07-error-state'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
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

// new code; entirely new test case; async...we're waiting for promise to get rejected
// happy path is tested in above...
// can get rid of a lot more stuff...
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}}) // woah mockRejected! and mock an error!
  const fakeUser = userBuilder()
  const {getByText, findByRole} = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  const postError = await findByRole('alert') // always with those awaits... //
  // findByRole keep trying...error out...hence await
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
