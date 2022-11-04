import React from 'react'
import ErrorFallback from './error-fallback'

interface Props {
  children: React.ReactNode
}

interface ErrorState {
  hasError: boolean
  error: Error | null
}

const defaultErrorState: ErrorState = {
  hasError: false,
  error: null,
}

class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: any) {
    super(props)
    this.state = defaultErrorState
    this.retry = this.retry.bind(this)
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
    })
  }

  retry() {
    this.setState(defaultErrorState)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback retry={this.retry} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
