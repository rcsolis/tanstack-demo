import {create} from 'zustand';

/**
 * Pokemon UI Store - Only contains client-side UI state
 * Server state is managed by TanStack Query
 */
export const usePokemonStore = create((set, get) => ({
  // UI State - Filters and preferences
  searchQuery: '',
  selectedType: '',
  sortBy: 'id',
  sortOrder: 'asc',
  viewMode: 'grid', // 'grid' or 'list'
  
  // Pagination UI State
  currentOffset: 0,
  limit: 20,
  
  // Favorites (could be persisted to localStorage)
  favorites: [],
  
  // UI Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // Pagination Actions
  setCurrentOffset: (offset) => set({ currentOffset: offset }),
  setLimit: (limit) => set({ limit }),
  goToPage: (page) => set({ currentOffset: (page - 1) * get().limit }),
  goToNextPage: () => set((state) => ({ currentOffset: state.currentOffset + state.limit })),
  goToPrevPage: () => set((state) => ({ 
    currentOffset: Math.max(0, state.currentOffset - state.limit) 
  })),
  
  // Favorites Actions
  addToFavorites: (pokemonId) => set((state) => ({
    favorites: [...state.favorites, pokemonId]
  })),
  removeFromFavorites: (pokemonId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== pokemonId)
  })),
  isFavorite: (pokemonId) => get().favorites.includes(pokemonId),
  
  // Reset functions
  resetFilters: () => set({ 
    searchQuery: '',
    selectedType: '',
    sortBy: 'id',
    sortOrder: 'asc',
    currentOffset: 0
  }),
  resetPagination: () => set({ currentOffset: 0 }),
}));