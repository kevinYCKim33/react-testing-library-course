import React from 'react'
import {useSelector, useDispatch} from 'react-redux' // some clean hooks!

function Counter() {
  const count = useSelector(state => state.count) // ~mapStateToProps...I want to connect straight to my store, probably mapped in <Provider />
  const dispatch = useDispatch()
  const increment = () => dispatch({type: 'INCREMENT'})
  const decrement = () => dispatch({type: 'DECREMENT'})
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export {Counter}
