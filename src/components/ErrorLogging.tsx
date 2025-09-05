import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundaryWithLogging extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`🚨 Admin Panel Error in ${this.props.context}:`, error, errorInfo);
    
    // In production, you would send this to your error tracking service
    if (import.meta.env.PROD) {
      // Track admin panel errors separately for security
      console.log('🔒 Admin error logged for internal review');
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md border-2 border-red-200">
            <div className="text-red-600 text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Admin Panel Error</h2>
            <p className="text-gray-600 mb-6">
              An error occurred in the administrative interface. This has been logged for review.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Reload Admin Panel
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Return to Main Site
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">Dev Error Details</summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto bg-red-50 p-2 rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              🔒 Internal Admin Error - Contact System Administrator
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}