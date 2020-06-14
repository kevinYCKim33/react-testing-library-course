// 7. Test React Component Event Handlers with fireEvent from React Testing Library
// 8. Improve Test Confidence with the User Event Module
import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// incredibly readable; it just reads itself
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender, queryByRole} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10') // simulates onKeyDown; onKeyUP; onChange
  // fireEvent.change(input, {target: {value: '10'}}) //input change is bit too vague
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  // debug() // error div showing here as expected
  rerender(<FavoriteNumber max={10} />) // simulates props being updated
  // debug() // error div not showing here as expected
  expect(queryByRole('alert')).toBeNull() // it reads like it should work but it doesn't
  // RTL errors out if getByBlah('foo') can't find foo
})

// queryBy vs getBy
// use queryBy: when trying to prove that something doesn't exist
// use getBy: for everything else; error display much clearer

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
