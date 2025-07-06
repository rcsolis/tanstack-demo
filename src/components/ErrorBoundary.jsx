import React from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * Error fallback component for query errors
 */
const QueryErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="text-red-600 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h2>
      <p className="text-red-700 text-center mb-6 max-w-md">
        {error.message || 'An unexpected error occurred while fetching data.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
      {import.meta.env.DEV && (
        <details className="mt-6 w-full max-w-2xl">
          <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
            Error Details (Development Only)
          </summary>
          <pre className="mt-2 p-4 bg-red-100 text-red-800 rounded text-xs overflow-auto">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

/**
 * Pokemon-specific error fallback for lighter errors
 */
const PokemonErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
      <div className="text-yellow-600 text-3xl mb-2">😵</div>
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pokemon Not Found</h3>
      <p className="text-yellow-700 text-center mb-4">
        {error.message || 'Unable to load this Pokemon.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

/**
 * Main Query Error Boundary component
 * Wraps components that use TanStack Query
 */
export const QueryErrorBoundary = ({ children, fallback = QueryErrorFallback }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={fallback}
          onReset={reset}
          onError={(error, errorInfo) => {
            console.error('Query Error Boundary caught an error:', error, errorInfo);
            // Here you could send error to logging service
            // logErrorToService(error, errorInfo);
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

/**
 * Pokemon-specific error boundary for individual Pokemon components
 */
export const PokemonErrorBoundary = ({ children }) => {
  return (
    <QueryErrorBoundary fallback={PokemonErrorFallback}>
      {children}
    </QueryErrorBoundary>
  );
};

/**
 * Network error boundary for connection issues
 */
const NetworkErrorFallback = ({ error, resetErrorBoundary }) => {
  const isNetworkError = error.message.includes('fetch') || 
                         error.message.includes('network') ||
                         error.message.includes('Failed to fetch');

  if (!isNetworkError) {
    return <QueryErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-blue-50 rounded-lg border border-blue-200">
      <div className="text-blue-600 text-6xl mb-4">🌐</div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Connection Problem</h2>
      <p className="text-blue-700 text-center mb-6 max-w-md">
        Unable to connect to the Pokemon API. Please check your internet connection.
      </p>
      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry Connection
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

/**
 * Network-specific error boundary
 */
export const NetworkErrorBoundary = ({ children }) => {
  return (
    <QueryErrorBoundary fallback={NetworkErrorFallback}>
      {children}
    </QueryErrorBoundary>
  );
};

export default QueryErrorBoundary;