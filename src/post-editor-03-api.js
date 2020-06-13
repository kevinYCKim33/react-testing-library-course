// 21 of 41 Test Drive the API Call of a React Form with React Testing Library
import React from 'react'
import {savePost} from './api' // pretend it does http request

function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements // didn't even know you could do this! gets all form elements by name
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id, // prop of Editor
    }
    setIsSaving(true)
    savePost(newPost) // just a fake posting of data // this needs to be faked in testing
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
