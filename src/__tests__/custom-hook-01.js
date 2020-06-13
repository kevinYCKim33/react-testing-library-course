// 33. Test a Custom React Hook with React’s Act Utility and a Test Component
/*
Normally if you have a custom hook that you're just 
using in one component then I recommend that you just test 
that component and not bother testing the hook directly. 
If you have a library or some sort of custom hook that is being 
used across your application it can be useful to test this in isolation, 
so that's what we're going to do.
*/

import React from 'react'
import {render, act} from '@testing-library/react'
// https://reactjs.org/docs/test-utils.html#act
// some low level version of render, and fireEvent
// wraps whatever you're going to do...render onto DOM, click button
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result // some sick trick to use a variable outside of the functional component
  // is this any useful ever??
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment()) // act??
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/*
02:08 One thing I want to know is that normally you don't need to use act 
from React testing library. All of React testing library's utilities, 
like wait, wait for element, wait for DOM change, and fire event, and find 
by queries, all of these are going to be wrapped in act automatically for you.

02:23 The reason that you have to use act here directly, is because you're 
calling directly this increment function, which itself is calling a state 
updater. There's nothing that React testing library can expose for you, 
to make sure that this is going to be wrapped inside of an act. 
You have to do that manually yourself. This is one of the few times that 
you do have to use act manually yourself.
*/
