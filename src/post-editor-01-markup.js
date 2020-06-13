// 19 of 41 Test Drive the Development of a React Form with React Testing Library
import React from 'react'

// Big Idea, this was created after tdd-01-markup.js
function Editor() {
  return (
    <form>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button type="submit">Submit</button>
    </form>
  )
}

export {Editor}
