import React from 'react'

type State = {
  hasError: boolean
  error?: Error | null
}

type Props = {
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You could log the error to an external service here
    // console.error(error, info)
  }

  reset() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={this.reset} style={{ marginRight: 8 }}>Try again</button>
            <button onClick={() => window.location.reload()}>Reload page</button>
          </div>
        </div>
      )
    }

    return this.props.children as React.ReactElement
  }
}
