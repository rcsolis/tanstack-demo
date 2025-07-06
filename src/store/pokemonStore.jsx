import {create} from 'zustand';


export const usePokemonStore = create((set) => ({
  pokemons: [],
  previousLink: null,
  nextLink: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  limit: 20,
  setLinks: (previousLink, nextLink) => set({ previousLink, nextLink }),
  setPaginationInfo: (currentPage, totalPages, totalCount) => set({ currentPage, totalPages, totalCount }),
  addPokemon: (pokemon) => set((state) => ({ pokemons: [...state.pokemons, pokemon] })),
  removePokemon: (pokemon) => set((state) => ({ pokemons: state.pokemons.filter((p) => p !== pokemon) })),
  clearPokemons: () => set({ pokemons: [], currentPage: 1, totalPages: 0, totalCount: 0 }),
}));