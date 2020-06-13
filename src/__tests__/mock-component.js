// 14. Mock react-transition-group in React Component Tests with jest.mock
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'
// import {wait} from '@testing-library/dom'

// code is just too good...
// motive: I don't want to wait 1000ms for this fade effect happening
// think you have to do something for jest to be able to import straight up a node_module
// mocking animation library
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  // brute force way to actually wait for the css transition to kick in without mocking
  // await wait(() => expect(queryByText(myMessage)).not.toBeInTheDocument())
})
