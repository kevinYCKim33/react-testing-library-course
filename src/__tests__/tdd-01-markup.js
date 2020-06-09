// 19. Test Drive the Development of a React Form with React Testing Library
import React from 'react'
import {render} from '@testing-library/react'
import {Editor} from '../post-editor-01-markup'

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i) // two birds in one stone...is there a label? is there an input associated to that label
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
