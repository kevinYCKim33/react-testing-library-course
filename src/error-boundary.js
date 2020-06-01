// https://reactjs.org/docs/error-boundaries.html
// 15 of 41 Test componentDidCatch Handler Error Boundaries with React Testing Library
// 16 of 41 Hide console.error Logs when Testing Error Boundaries with jest.spyOn ==> error-boundary-02.js
// 17 of 41 Ensure Error Boundaries can successfully recover from errors

import React from 'react'
import {reportError} from './api'

// <ErrorBoundary>{children}</ErrorBoundary>
// if it catches an error inside any of its children, it will call componentDidCatch
// which in there you set the state of hasError to true and can you to report an error to a third party thing

// report error to server
class ErrorBoundary extends React.Component {
  state = {hasError: false}
  componentDidCatch(error, info) {
    this.setState({hasError: true})
    reportError(error, info)
  }
  tryAgain = () => this.setState({hasError: false})
  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>{' '}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    )
  }
}

export {ErrorBoundary}
