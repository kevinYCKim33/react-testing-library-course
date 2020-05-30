import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// incredibly readable; it just reads itself
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10') // simulates onKeyDown; onKeyUP; onChange
  // fireEvent.change(input, {target: {value: '10'}}) //input change is bit too vague
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
