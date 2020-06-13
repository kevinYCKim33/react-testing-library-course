// 30. Test a Redux Connected React Component
import React from 'react'
import {Provider} from 'react-redux'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

// put the thing in a REAL Provider!
// the real store!

// testing an integration here too!
// this is NOT a unit test!
// getting good bang for your buck!
test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1') // aria-label for the win!
})
