import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
// the ol render as rtlRender trick...
// I need to get this down...
import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
// function render(ui, options)
function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState), // if they want to create their own store...
    ...renderOptions // never really got what this is...
  } = {},
) {
  function Wrapper({children}) {
    // put literally any wrapper here
    // <Styled /> <Apollo /> <MaterailUI />
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper, // nor this...
      ...renderOptions,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    // aka you shouldn't but if you really want to here it is...
    store,
  }
  /*
    This is functionally equivalent, except rtlRender is going to return a re-render utility. 
    If we call the re-render utility, we don't have to re-render with the provider. 
    We can just re-render the same ui. That will automatically be wrapped inside this provider.
  */
}

test('can increment the value', () => {
  const {getByLabelText, getByText} = render(<Counter />) // technically his custom render...
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can decrement the value', () => {
  const {getByLabelText, getByText} = render(<Counter />, {
    // his custom render, 2nd arg is options obviously...
    initialState: {count: 3},
  })
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
