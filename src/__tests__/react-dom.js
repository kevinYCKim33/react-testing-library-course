// 2. Render a React Component for Testing
// Kent already hooked up the jest config to have this
// it's in his kcd-scripts/jest
// import {toHaveAttribute, toHaveTextContent} from '@testing-library/jest-dom'
// expect.extend({toHaveAttribute, toHaveTextContent})

import React from 'react'
// import ReactDOM from 'react-dom'  // needless after importing RTL
// import {getQueriesForElement} from '@testing-library/dom' // needless after importing RTL
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// RTL render in a nutshell
// function render(ui) {
//   const container = document.createElement('div')
//   ReactDOM.render(ui, container)
//   const queries = getQueriesForElement(container)
//   return {container, ...queries} // i.e. getByLabelText
// }

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  // debug: an option you can destrucutre out of render
  // debug() // displays what the dom node is at that given time
  const input = getByLabelText(/favorite number/i) // case independent
  // debug(input) // can also pass in a specific subset of your component
  // get the input associated with this label text; hitting 2 birds w. one stone
  expect(input).toHaveAttribute('type', 'number')
})

// step 1 just do a quick console.log
// console.log(div.innerHTML) // a good hack
// <div>
//   <label for="favorite-number">Favorite Number</label>
//   <input id="favorite-number" type="number" value="0">
// </div>

// const input = queries.getByLabelText(div, 'Favorite Number')
// DOM testing library is going to search all of the children of this div for a label
// that has this text. Then it's going to find the form control that's associated to
// that label and return that as our input.

// okay
// expect(div.querySelector('input').type).toBe('number')
// better

// okay
// expect(div.querySelector('label').textContent).toBe('Favorite Number')
// better
// expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
// expect(input).toHaveTextContent('Favorite Number')
