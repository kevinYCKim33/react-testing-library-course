// 40. Improve Reliability of Integration Tests using find\* Queries from React Testing Library
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

// TLDR: changed getBy with findBy await
// https://testing-library.com/docs/dom-testing-library/api-queries#findby
// find by is just waitFor X getBy
// so why not do findBy all the time??
// if you know for sure there isn't some async thing going on...
/*
00:01 We have our test passing and that's great, 
but there's something that we could do to make this test maybe 
a little bit more resilient. That is, we are expecting to be able 
to do getbys on all of these labels and text elements that we are clicking on.

00:14 It could be that when transitioning from one page to another, 
there's some sort of animation or some sort of data load that's 
happening before we make that transition happen. 
To make our test a little bit more resilient, maybe we could just change 
all these getbys to findbys and await all of those wrong nodes to be 
found so that we get the retryability that comes baked in with React 
as the library.
*/

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  fireEvent.click(await findByText(/fill.*form/i))

  fireEvent.change(await findByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(await findByText(/next/i))

  fireEvent.change(await findByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(await findByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})
