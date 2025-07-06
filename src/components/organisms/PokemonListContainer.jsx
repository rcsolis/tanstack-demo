import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePokemonStore } from '../../store/pokemonStore';
import { fetchPokemons, generateFirstPageUrl, generateLastPageUrl } from '../../service/pokemonService';
import { Text } from '../atoms/Text';
import { PaginationControls } from '../molecules/PaginationControls';
import { PokemonGrid } from './PokemonGrid';

export function PokemonListContainer() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const { 
    pokemons, 
    nextLink, 
    previousLink, 
    currentPage, 
    totalPages, 
    totalCount, 
    setLinks, 
    setPaginationInfo, 
    addPokemon,
    clearPokemons
  } = usePokemonStore();

  const handlePrevious = () => {
    if (previousLink) {
      clearPokemons();
      setUrl(previousLink);
    }
  };

  const handleNext = () => {
    if (nextLink) {
      clearPokemons();
      setUrl(nextLink);
    }
  };

  const handleFirst = () => {
    clearPokemons();
    setUrl(generateFirstPageUrl());
  };

  const handleLast = () => {
    if (totalCount > 0) {
      clearPokemons();
      setUrl(generateLastPageUrl(totalCount));
    }
  };

  const query = useQuery({
    queryKey: ['pokemons', url],
    queryFn: () => fetchPokemons(url, addPokemon, setLinks, setPaginationInfo),
  });

  const handleRetry = () => {
    query.refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-fit space-y-6">
      <Text variant="h2" weight="bold" className="text-center">
        Pokémon List
      </Text>
      
      <div className="w-full max-w-4xl">
        <PaginationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFirst={handleFirst}
          onLast={handleLast}
          hasPrevious={!!previousLink}
          hasNext={!!nextLink}
          currentPage={currentPage}
          totalPages={totalPages}
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