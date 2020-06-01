import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

// async function reportError() {
//   await sleep(1000)
//   return {success: true}
// }

jest.mock('../api') // mock all functions exported out from ../api

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}) // clear out any console.log errors
})

afterAll(() => {
  console.error.mockRestore() // return it to its initial state
})

afterEach(() => {
  jest.clearAllMocks() // difference btw error.mockRestore vs jest.clearAllMocks()?
  // this seems to be an all over thing, afterAll seems to be an instance thing
})

// since Bomb is a child of <ErrorBoundary />
// an error of Bomb will trigger ErrorBoundary's componentDidCatch
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true}) // set a fake error to go off
  // why report an error here? shouldn't it have reported after the Bomb goes off??

  const {rerender, getByText, queryByText, getByRole, queryByRole} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  console.error.mockClear() // clear out error logs for next batch of tests
  mockReportError.mockClear()

  // don't have it go off??
  // shouldn't you click the try again and check that the children get seen?
  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
