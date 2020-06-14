// 37. Test React Portals with within from React Testing Library
import React from 'react'
import {render, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  const {getByTestId} = within(document.getElementById('modal-root')) // oof test id?
  // also within! so it's bound to the modal-root elem, and not the document.body!
  expect(getByTestId('test')).toBeInTheDocument()
})
