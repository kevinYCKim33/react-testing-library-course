// 41. Improve Reliability of Integration Tests Using the User Event Module
import React from 'react'
import {render} from '@testing-library/react'
import user from '@testing-library/user-event' // why doesn't he user-event all the time??
import {submitForm as mockSubmitForm} from '../api'
import App from '../app-reach-router' // ohh reach??

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  // much easier to read!
  // key! no more implementation  details!
  // changed context to redux? it should still pass!
  // therefore, keep implementation details out of tests!!!
  user.click(await findByText(/fill.*form/i)) // await til you find it, then click it!

  user.type(await findByLabelText(/food/i), testData.food)
  user.click(await findByText(/next/i))

  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  user.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})
