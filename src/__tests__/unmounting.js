// 38. Test Unmounting a React Component with React Testing Library
import React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

// always try to break your tests!!

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}) // keeps our console clean
})

afterAll(() => {
  console.error.mockRestore() // keeps tests isolated from each other
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers() // everything else useRealTimers!
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers()
  const {unmount} = render(<Countdown />) // oh dang, it's got an unmount!
  unmount()
  act(() => jest.runOnlyPendingTimers()) // need act when doing jest fake timers
  expect(console.error).not.toHaveBeenCalled()
})
