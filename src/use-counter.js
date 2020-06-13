import React from 'react'

function useCounter({initialCount = 0, step = 1} = {}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step) // not count + 1??
  const decrement = () => setCount(c => c - step)
  return {count, increment, decrement}
}

export {useCounter}

// import {useCounter} from './use-counter'
// const GenericComponent = () => {
//   const {count, increment, decrement} = useCounter()

//   return (
//     <div>
//       <button onClick={increment}>incremenet</button>
//       <button onClick={decrement}>decrement</button>
//       {count}
//     </div>
//   )
// }
