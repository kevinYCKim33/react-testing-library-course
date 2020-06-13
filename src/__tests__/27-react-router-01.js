// 27. Test React Components that Use the react-router Router Provider with createMemoryHistory
import React from 'react'
import {Router} from 'react-router-dom' // instead of BrowserRouter since we can create your own history
import {createMemoryHistory} from 'history' // this is new...
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  // can only do with Router not BrowserRouter
  const history = createMemoryHistory({initialEntries: ['/']}) // this looks weird...
  // Main has Link, Switch, Route, those all need to be wrapped in some sort of a Router
  const {getByRole, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  // when first rendered, you should be at home...
  // you will be because of initialEntries
  expect(getByRole('heading')).toHaveTextContent(/home/i) //heading?? <h1>Home</h1>
  // and then you click on about the Link...
  fireEvent.click(getByText(/about/i))
  // I then wwant to be at a page where the heading is About
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})
