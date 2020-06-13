// 15. Test componentDidCatch Handler Error Boundaries with React Testing Library
import React from 'react'
import {render} from '@testing-library/react'
import {reportError as mockReportError} from '../api' // this gets mocked
import {ErrorBoundary} from '../error-boundary'

// async function reportError() {
//   await sleep(1000)
//   return {success: true}
// }

jest.mock('../api') // 1. because you're mocking everything from ../api

// ensure all the mocks have all been cleared
// make sure the mockReportError is not leaking out in other tests
afterEach(() => {
  jest.clearAllMocks()
})

// test only component
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true}) //mockResolved since it was a promise
  const {rerender} = render(
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
})

// this is only here to make the error output not appear in the project's output
// even though in the course we don't include this bit and leave it in it's incomplete state.
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

/*
eslint
  jest/prefer-hooks-on-top: off
*/
