/**
 * Clean Pokemon API service layer
 * Returns pure data without side effects or state manipulation
 */

const API_BASE_URL = 'https://pokeapi.co/api/v2'
const DEFAULT_LIMIT = 20

/**
 * Fetch Pokemon list with pagination
 * @param {number} offset - Starting offset for pagination
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} Pokemon list data with pagination info
 */
export const fetchPokemonList = async (offset = 0, limit = DEFAULT_LIMIT) => {
  try {
    const url = `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    console.log('Fetching Pokemon list from:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Transform data to include pagination metadata
    return {
      results: data.results.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url,
        id: extractIdFromUrl(pokemon.url)
      })),
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        offset,
        limit,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(data.count / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    throw new Error(`Failed to fetch Pokemon list: ${error.message}`)
  }
}

/**
 * Fetch individual Pokemon details
 * @param {string|number} id - Pokemon ID or name
 * @returns {Promise<Object>} Pokemon detail data
 */
export const fetchPokemonDetail = async (id) => {
  try {
    const url = `${API_BASE_URL}/pokemon/${id}`
    console.log('Fetching Pokemon detail:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Transform data to consistent format
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      picture: data.sprites?.other?.['official-artwork']?.front_default || 
               data.sprites?.front_default || 
               `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      types: data.types?.map(type => type.type.name) || [],
      abilities: data.abilities?.map(ability => ability.ability.name) || [],
      stats: data.stats?.map(stat => ({
        name: stat.stat.name,
        base_stat: stat.base_stat
      })) || [],
      sprites: {
        front_default: data.sprites?.front_default,
        front_shiny: data.sprites?.front_shiny,
        back_default: data.sprites?.back_default,
        back_shiny: data.sprites?.back_shiny
      }
    }
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error)
    throw new Error(`Failed to fetch Pokemon detail: ${error.message}`)
  }
}

/**
 * Fetch multiple Pokemon details in parallel
 * @param {Array<string|number>} ids - Array of Pokemon IDs
 * @returns {Promise<Array>} Array of Pokemon details
 */
export const fetchMultiplePokemonDetails = async (ids) => {
  try {
    const promises = ids.map(id => fetchPokemonDetail(id))
    const results = await Promise.allSettled(promises)
    
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        console.error(`Failed to fetch Pokemon ${ids[index]}:`, result.reason)
        return null
      }
    }).filter(Boolean) // Remove null values
  } catch (error) {
    console.error('Error fetching multiple Pokemon details:', error)
    throw new Error(`Failed to fetch multiple Pokemon details: ${error.message}`)
  }
}

/**
 * Search Pokemon by name
 * @param {string} query - Search query
 * @param {number} limit - Max results to return
 * @returns {Promise<Array>} Array of matching Pokemon
 */
export const searchPokemon = async (query, limit = 20) => {
  try {
    // For now, we'll fetch the first page and filter
    // In a real app, you'd want a proper search endpoint
    const data = await fetchPokemonList(0, 1000) // Fetch more for better search
    
    const filteredResults = data.results
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit)
    
    return filteredResults
  } catch (error) {
    console.error('Error searching Pokemon:', error)
    throw new Error(`Failed to search Pokemon: ${error.message}`)
  }
}

/**
 * Fetch Pokemon species information
 * @param {string|number} id - Pokemon ID or name
 * @returns {Promise<Object>} Pokemon species data
 */
export const fetchPokemonSpecies = async (id) => {
  try {
    const url = `${API_BASE_URL}/pokemon-species/${id}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      id: data.id,
      name: data.name,
      color: data.color?.name,
      habitat: data.habitat?.name,
      generation: data.generation?.name,
      is_legendary: data.is_legendary,
      is_mythical: data.is_mythical,
      flavor_text: data.flavor_text_entries?.find(
        entry => entry.language.name === 'en'
      )?.flavor_text || ''
    }
  } catch (error) {
    console.error('Error fetching Pokemon species:', error)
    throw new Error(`Failed to fetch Pokemon species: ${error.message}`)
  }
}

/**
 * Utility function to extract ID from Pokemon URL
 * @param {string} url - Pokemon URL
 * @returns {string} Pokemon ID
 */
const extractIdFromUrl = (url) => {
  const matches = url.match(/\/pokemon\/(\d+)\//)
  return matches ? matches[1] : null
}

/**
 * Generate pagination URLs (deprecated - use fetchPokemonList with offset/limit)
 */
export const generateFirstPageUrl = (limit = DEFAULT_LIMIT) => {
  return `${API_BASE_URL}/pokemon?offset=0&limit=${limit}`
}

export const generateLastPageUrl = (totalCount, limit = DEFAULT_LIMIT) => {
  const lastOffset = Math.floor((totalCount - 1) / limit) * limit
  return `${API_BASE_URL}/pokemon?offset=${lastOffset}&limit=${limit}`
}