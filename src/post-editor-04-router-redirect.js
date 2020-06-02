// 22. Test Drive Mocking react-router’s Redirect Component on a Form Submission
import React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
    }
    setIsSaving(true)
    savePost(newPost).then(() => setRedirect(true)) // this is async
  }
  if (redirect) {
    return <Redirect to="/" /> // yes pretty cool
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
