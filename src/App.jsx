import {version} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { PokemonList } from './components/PokemonList'
import { QueryErrorBoundary } from './components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center 
        justify-start min-h-screen min-w-4xl">
          <div className="flex flex-col items-center 
          justify-center border-1 
          border-gray-300 rounded-xl 
          bg-blue-50 
          shadow-blue-50 shadow-sm
          w-full m-2">
            <h1 className="text-black font-semibold">Vite + React {version}</h1>
            <div className="flex flex-row items-center-safe justify-evenly w-full">
              <img src={viteLogo} className="logo" alt="Vite logo" />
              <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
          </div>
          <QueryErrorBoundary>
            <PokemonList />
          </QueryErrorBoundary>
        </div>
      <ReactQueryDevtools initialIsOpen={true} client={queryClient}/>
      </QueryClientProvider>
    </>
  )
}

export default App
