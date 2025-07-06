import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query'
import { pokemonKeys, queryKeyUtils } from '../lib/queryKeys'
import { 
  fetchPokemonList, 
  fetchPokemonDetail, 
  searchPokemon,
  fetchPokemonSpecies
} from '../service/pokemonApiService'

/**
 * Hook to fetch Pokemon list with pagination
 * @param {number} offset - Starting offset for pagination
 * @param {number} limit - Number of items per page
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result with Pokemon list and pagination info
 */
export const usePokemonList = (offset = 0, limit = 20, options = {}) => {
  return useQuery({
    queryKey: pokemonKeys.list({ offset, limit }),
    queryFn: () => fetchPokemonList(offset, limit),
    ...options
  })
}

/**
 * Hook to fetch individual Pokemon details
 * @param {string|number} id - Pokemon ID or name
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result with Pokemon details
 */
export const usePokemon = (id, options = {}) => {
  return useQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id, // Only run if ID is provided
    ...options
  })
}

/**
 * Hook to fetch multiple Pokemon details in parallel
 * @param {Array<string|number>} ids - Array of Pokemon IDs
 * @param {Object} options - Additional TanStack Query options
 * @returns {Array} Array of query results
 */
export const usePokemonDetails = (ids = [], options = {}) => {
  return useQueries({
    queries: ids.map(id => ({
      queryKey: pokemonKeys.detail(id),
      queryFn: () => fetchPokemonDetail(id),
      enabled: !!id,
      ...options
    }))
  })
}

/**
 * Hook to search Pokemon by name with debouncing
 * @param {string} query - Search query
 * @param {Object} options - Additional options
 * @returns {Object} Query result with search results
 */
export const usePokemonSearch = (query, options = {}) => {
  const { ...queryOptions } = options
  
  return useQuery({
    queryKey: pokemonKeys.search(query),
    queryFn: () => searchPokemon(query, 50), // Search more items
    enabled: !!query && query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 10 * 60 * 1000, // Keep search results fresh for 10 minutes
    ...queryOptions
  })
}

/**
 * Hook to fetch Pokemon species information
 * @param {string|number} id - Pokemon ID or name
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result with species information
 */
export const usePokemonSpecies = (id, options = {}) => {
  return useQuery({
    queryKey: pokemonKeys.specie(id),
    queryFn: () => fetchPokemonSpecies(id),
    enabled: !!id,
    ...options
  })
}

/**
 * Hook to prefetch Pokemon details for better UX
 * @param {string|number} id - Pokemon ID to prefetch
 */
export const usePrefetchPokemon = () => {
  const queryClient = useQueryClient()
  
  const prefetchPokemon = (id) => {
    queryKeyUtils.prefetchDetail(queryClient, id, fetchPokemonDetail)
  }
  
  const prefetchPokemonList = (offset, limit = 20) => {
    queryClient.prefetchQuery({
      queryKey: pokemonKeys.list({ offset, limit }),
      queryFn: () => fetchPokemonList(offset, limit),
    })
  }
  
  return { prefetchPokemon, prefetchPokemonList }
}

/**
 * Hook to manage Pokemon cache operations
 */
export const usePokemonCache = () => {
  const queryClient = useQueryClient()
  
  const invalidateAllPokemon = () => {
    queryKeyUtils.invalidateAll(queryClient)
  }
  
  const invalidatePokemonLists = () => {
    queryKeyUtils.invalidateLists(queryClient)
  }
  
  const invalidatePokemon = (id) => {
    queryKeyUtils.invalidateDetail(queryClient, id)
  }
  
  const getCachedPokemon = (id) => {
    return queryKeyUtils.getCachedDetail(queryClient, id)
  }
  
  const setCachedPokemon = (id, data) => {
    queryKeyUtils.setCachedDetail(queryClient, id, data)
  }
  
  return {
    invalidateAllPokemon,
    invalidatePokemonLists,
    invalidatePokemon,
    getCachedPokemon,
    setCachedPokemon
  }
}

/**
 * Hook for infinite Pokemon list (for infinite scrolling)
 * @param {number} limit - Number of items per page
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Infinite query result
 */
export const usePokemonInfinite = (limit = 20, options = {}) => {
  return useQuery({
    queryKey: pokemonKeys.list({ infinite: true, limit }),
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.next) {
        // Extract offset from next URL
        const url = new URL(lastPage.pagination.next)
        return parseInt(url.searchParams.get('offset') || '0')
      }
      return undefined
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination.previous) {
        const url = new URL(firstPage.pagination.previous)
        return parseInt(url.searchParams.get('offset') || '0')
      }
      return undefined
    },
    ...options
  })
}

/**
 * Hook for dependent queries - fetch details only when list is available
 * @param {number} offset - Starting offset
 * @param {number} limit - Number of items per page
 * @param {Object} options - Additional options
 * @returns {Object} Combined query results
 */
export const usePokemonListWithDetails = (offset = 0, limit = 20, options = {}) => {
  const { enableDetails = true, ...queryOptions } = options
  
  // First, fetch the list
  const listQuery = usePokemonList(offset, limit, queryOptions)
  
  // Then fetch details for all Pokemon in the list
  const pokemonIds = listQuery.data?.results?.map(pokemon => pokemon.id) || []
  const detailsQueries = usePokemonDetails(pokemonIds, {
    enabled: enableDetails && listQuery.isSuccess && pokemonIds.length > 0,
    ...queryOptions
  })
  
  return {
    list: listQuery,
    details: detailsQueries,
    isLoading: listQuery.isLoading || detailsQueries.some(q => q.isLoading),
    isError: listQuery.isError || detailsQueries.some(q => q.isError),
    error: listQuery.error || detailsQueries.find(q => q.error)?.error,
    combinedData: listQuery.data?.results?.map((pokemon, index) => ({
      ...pokemon,
      details: detailsQueries[index]?.data || null
    })) || []
  }
}