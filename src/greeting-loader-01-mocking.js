import React from 'react'
import {loadGreeting} from './api'

// const greetings = ['Hello', 'Hi', 'Hey there', `What's up`, 'Howdy', `G'day`]

// async function loadGreeting(subject) {
//   return {data: {greeting: `${await fetchRandomGreeting()} ${subject}`}}
// }

// async function fetchRandomGreeting() {
//   await sleep(1000)
//   return greetings[Math.floor(Math.random() * greetings.length)]
// }

// form with a button to load a greeting from a fake server
// grabs random hello's from an array

function GreetingLoader() {
  const [greeting, setGreeting] = React.useState('')
  async function loadGreetingForInput(e) {
    e.preventDefault()
    const {data} = await loadGreeting(e.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  )
}

export {GreetingLoader}
