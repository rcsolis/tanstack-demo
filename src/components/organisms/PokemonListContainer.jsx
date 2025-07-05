import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePokemonStore } from '../../store/pokemonStore';
import { fetchPokemons } from '../../service/pokemonService';
import { Text } from '../atoms/Text';
import { PaginationControls } from '../molecules/PaginationControls';
import { PokemonGrid } from './PokemonGrid';

export function PokemonListContainer() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const { pokemons, nextLink, previousLink, setLinks, addPokemon } = usePokemonStore();

  const handlePrevious = () => {
    if (previousLink) {
      setUrl(previousLink);
    }
  };

  const handleNext = () => {
    if (nextLink) {
      setUrl(nextLink);
    }
  };

  const query = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => fetchPokemons(url, addPokemon, setLinks),
  });

  const handleRetry = () => {
    query.refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-fit space-y-6">
      <Text variant="h2" weight="bold" className="text-center">
        Pokémon List
      </Text>
      
      <div className="w-full max-w-md">
        <PaginationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={!!previousLink}
          hasNext={!!nextLink}
        />
      </div>
      
      <PokemonGrid
        pokemons={pokemons}
        loading={query.isLoading}
        error={query.error}
        onRetry={handleRetry}
      />
    </div>
  );
}