// vid 12 of 41 RTL
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {loadGreeting as mockLoadGreeting} from '../api' // because of jest.mock, this imported fcn will be a jest mock fcn
import {GreetingLoader} from '../greeting-loader-01-mocking'

// any time there's an http request involved...safe to mock
jest.mock('../api') // mock every exported fcn from that file

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i) // gets the input associated with the label
  const loadButton = getByText(/load/i) // gets the button associated with the text load
  nameInput.value = 'Mary' // weird...
  fireEvent.click(loadButton) // no user.click??
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary') // yup
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1) // yup not thumbwar best out of 3 // bad for cc
  // await since you're awaiting for the loadGreetingForInput to finish resolving
  // await since you're waiting for a state update
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})

// when I don't wrap this in await...
// I  get this error
// ====================
// console.error node_modules/react-dom/cjs/react-dom.development.js:88
// Warning: An update to GreetingLoader inside a test was not wrapped in act(...).

// When testing, code that causes React state updates should be wrapped into act(...):

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */

// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
//     in GreetingLoader
