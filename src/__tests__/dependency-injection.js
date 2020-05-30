// RTL 13 of 41 Mock HTTP Requests with Dependency Injection in React Component Tests
import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

// It's basically the exact same thing that we had before, except it's not mocking the entire module. We're just mocking this function and passing it on as a prop to the GreetingLoader component.
test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn() // jest.fn vs jest.mock?
  // ken usually recommends jest.mock, but for some odd cases (storybook?) where they don't support mock, use jest.fn and pass in dependency
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  ) // dependency injection, GreetingLoader will now accept loadGreeting
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
