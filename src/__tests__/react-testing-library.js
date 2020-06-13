// 5. Use React Testing Library to Render and Test React Components
// 6. Debug the DOM State During Tests using React Testing Library’s debug Function
import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const {
    getByLabelText,
    // debug
  } = render(<FavoriteNumber />)
  // debug()
  const input = getByLabelText(/favorite number/i)
  // debug(input)
  expect(input).toHaveAttribute('type', 'number')
})
