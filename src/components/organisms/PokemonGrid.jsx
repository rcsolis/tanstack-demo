import { PokemonCard } from '../molecules/PokemonCard';
import { LoadingSpinner } from '../molecules/LoadingSpinner';
import { ErrorMessage } from '../molecules/ErrorMessage';

export function PokemonGrid({ 
  pokemons = [], 
  loading = false, 
  error = null,
  onRetry = null 
}) {
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <LoadingSpinner message="Loading Pokémon..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <ErrorMessage 
          message={error.message || 'Failed to load Pokémon'} 
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (pokemons.length === 0 && !loading) {
    return (
      <div className="w-full flex justify-center">
        <ErrorMessage 
          title="No Pokémon Found" 
          message="No Pokémon available to display."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}