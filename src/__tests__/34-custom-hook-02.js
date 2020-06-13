// 34. Write a Setup Function to Reduce Duplication of Testing Custom React Hooks
import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props) // useRef??
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  // let result;
  const result = setup() // a sleeker way  of doing let trick from custom-hook-01
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/*
I can tell you what's going on. We have this variable result and that's getting reassigned every single time we re-render this component we're just reassigning this variable.

01:55 This variable result inside of our second test is a different variable. We are not reassigning that at all. We are getting result.count and we can't call result.increment but that creates a brand new result variable and we don't get access to that new result variable that we are getting from useCounter.

02:09 The way we are going to solve this is I'm actually going to make this a const value. We'll make this an object and then we can say, result.current=UseCounter.

03:09 Then we had to update the result so that it was more of a ref type thing. We keep referential equality so that this result object remains the same and the current value can change between renders as we call things that trigger rerenders like increment and decrement.

*/
