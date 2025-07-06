/**
 * Query key factory for Pokemon API
 * Provides hierarchical, consistent query keys for TanStack Query
 */

export const pokemonKeys = {
  // Base key for all Pokemon-related queries
  all: ['pokemon'],
  
  // Pokemon list queries
  lists: () => [...pokemonKeys.all, 'list'],
  list: (filters) => [...pokemonKeys.lists(), filters],
  
  // Individual Pokemon queries
  details: () => [...pokemonKeys.all, 'detail'],
  detail: (id) => [...pokemonKeys.details(), id],
  
  // Pokemon search queries
  searches: () => [...pokemonKeys.all, 'search'],
  search: (query) => [...pokemonKeys.searches(), query],
  
  // Pokemon species queries
  species: () => [...pokemonKeys.all, 'species'],
  specie: (id) => [...pokemonKeys.species(), id],
  
  // Evolution chain queries
  evolutions: () => [...pokemonKeys.all, 'evolution'],
  evolution: (id) => [...pokemonKeys.evolutions(), id],
}

/**
 * Utility functions for query key management
 */
export const queryKeyUtils = {
  /**
   * Invalidate all Pokemon queries
   */
  invalidateAll: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: pokemonKeys.all })
  },
  
  /**
   * Invalidate specific Pokemon list queries
   */
  invalidateLists: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: pokemonKeys.lists() })
  },
  
  /**
   * Invalidate specific Pokemon detail
   */
  invalidateDetail: (queryClient, id) => {
    queryClient.invalidateQueries({ queryKey: pokemonKeys.detail(id) })
  },
  
  /**
   * Prefetch Pokemon detail
   */
  prefetchDetail: (queryClient, id, queryFn) => {
    queryClient.prefetchQuery({
      queryKey: pokemonKeys.detail(id),
      queryFn: () => queryFn(id),
    })
  },
  
  /**
   * Get cached Pokemon detail
   */
  getCachedDetail: (queryClient, id) => {
    return queryClient.getQueryData(pokemonKeys.detail(id))
  },
  
  /**
   * Set cached Pokemon detail
   */
  setCachedDetail: (queryClient, id, data) => {
    queryClient.setQueryData(pokemonKeys.detail(id), data)
  },
}