import {create} from 'zustand';


export const usePokemonStore = create((set) => ({
  pokemons: [],
  previousLink: null,
  nextLink: null,
  setLinks: (previousLink, nextLink) => set({ previousLink, nextLink }),
  addPokemon: (pokemon) => set((state) => ({ pokemons: [...state.pokemons, pokemon] })),
  removePokemon: (pokemon) => set((state) => ({ pokemons: state.pokemons.filter((p) => p !== pokemon) })),
  clearPokemons: () => set({ pokemons: [] }),
}));