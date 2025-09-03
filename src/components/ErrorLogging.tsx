import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundaryWithLogging extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Panel Error:', {
      context: this.props.context,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Admin Panel Error</h2>
            <p className="text-gray-600 mb-6">
              An error occurred in the admin panel. Please reload the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Reload Admin Panel
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}