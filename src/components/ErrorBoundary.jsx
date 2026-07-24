import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error in component tree:', error, info);
    this.setState({ info });
  }

  render() {
    const { hasError, error, info } = this.state;
    if (!hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-sm mb-4 text-slate-600">An unexpected error occurred while loading the app. Please try refreshing the page.</p>
          <details className="text-xs text-left p-3 bg-gray-50 rounded-md overflow-auto" style={{ maxHeight: 240 }}>
            <summary className="cursor-pointer text-sm font-medium">Error details</summary>
            <pre className="whitespace-pre-wrap text-xs mt-2">{String(error)}{info?.componentStack}</pre>
          </details>
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => window.location.reload()} className="px-4 py-2 rounded bg-brand text-white">Reload</button>
          </div>
        </div>
      </div>
    );
  }
}
