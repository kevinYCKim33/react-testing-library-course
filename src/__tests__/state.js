import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// incredibly readable; it just reads itself
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})

/*
<body>
  <div>
    <div>
      <label
        for="favorite-number"
      >
        Favorite Number
      </label>
      <input
        id="favorite-number"
        type="number"
        value="0"
      />
    </div>
  </div>
</body>
*/
