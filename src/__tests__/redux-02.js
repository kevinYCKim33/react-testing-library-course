import React from 'react'
import {createStore} from 'redux' // nice! testing initialized state!
import {Provider} from 'react-redux'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter'
import {store as appStore} from '../redux-store' // some mocking going on probably...
import {reducer} from '../redux-reducer' // need reducer for our own createStore for second test

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

// new test y'all!
test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3}) // creating our own store with an initialized state!!
  // ^ ^ neat trick! no need to do a bunch of weird work to start from initial state to get to the state you want to test!
  // it's like fast forwarding in time!
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('-')) // aria-label is kind of weird...
  expect(getByLabelText(/count/i)).toHaveTextContent('2') // yes, this tests initial state!
})
