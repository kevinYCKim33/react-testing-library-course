// 20 of 41 Test Drive the Submission of a React Form with React Testing Library
import React from 'react'

function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
