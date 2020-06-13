// 20 of 41 Test Drive the Submission of a React Form with React Testing Library
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Editor} from '../post-editor-02-state'

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled() // is this RTL or jest? it's jestDOM
})

// I get it, he's developing as he tests
