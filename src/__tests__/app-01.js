// 39. Write React Application Integration Tests with React Testing Library
// but testing a lot of contexts, and states, and getting a lot of bang for buck!
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api' // not mocking too much!
import App from '../app'

// must be nice to have functions completely outside of
// async function submitForm() {
// await sleep(1000)
// return {success: true}
// }

jest.mock('../api') // prevent real http calls

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true}) // priming...
  const testData = {food: 'test food', drink: 'test drink'}
  const {getByLabelText, getByText, findByText} = render(<App />)

  fireEvent.click(getByText(/fill.*form/i)) // fill out the form; fill this form out; pretty generous

  fireEvent.change(getByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(getByText(/next/i)) // moving onto the next page

  // keep using debug()

  fireEvent.change(getByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(getByText(/review/i)) // get to confirmation page!

  // debug()

  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(getByText(/confirm/i, {selector: 'button'}))
  /*
  4:52 Oh, but we're getting multiple elements with the text confirm. 
  That is not intentional. We're not going to use the all by variants of 
  the query. It looks confirm is showing up in this H2 as well as our button. 
  That's pretty common.

  5:05 What we're going to do here is we'll just say selector: button. 
  We'll scope this get by text to only those elements that match the 
  CSS selector button.
  */

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1) // since this leads to a promise chain

  fireEvent.click(await findByText(/home/i)) // the only reason it's async

  // getByText(/welcome home/i) // good enough, but...
  expect(getByText(/welcome home/i)).toBeInTheDocument()
  // 6:10 If we want to make it look a little bit more like an assertion, then we can just say, expect, toBeInTheDocument().
})
