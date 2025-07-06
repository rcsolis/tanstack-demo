import { usePokemonStore } from '../../store/pokemonStore';
import { usePokemonListWithDetails, usePrefetchPokemon } from '../../hooks/usePokemon';
import { Text } from '../atoms/Text';
import { PaginationControls } from '../molecules/PaginationControls';
import { PokemonGrid } from './PokemonGrid';

export function PokemonListContainer() {
  const { 
    currentOffset, 
    limit, 
    setCurrentOffset, 
    goToNextPage, 
    goToPrevPage, 
    resetPagination
  } = usePokemonStore();

  const { prefetchPokemonList } = usePrefetchPokemon();

  // Fetch Pokemon list with details using the new hook
  const { list, isLoading, error, combinedData } = usePokemonListWithDetails(
    currentOffset, 
    limit
  );

  // Prefetch next and previous pages for better UX
  const pagination = list.data?.pagination;
  if (pagination?.next) {
    const nextOffset = currentOffset + limit;
    prefetchPokemonList(nextOffset, limit);
  }
  if (pagination?.previous) {
    const prevOffset = Math.max(0, currentOffset - limit);
    prefetchPokemonList(prevOffset, limit);
  }

  const handlePrevious = () => {
    if (pagination?.previous) {
      goToPrevPage();
    }
  };

  const handleNext = () => {
    if (pagination?.next) {
      goToNextPage();
    }
  };

  const handleFirst = () => {
    resetPagination();
  };

  const handleLast = () => {
    if (pagination?.count > 0) {
      const lastOffset = Math.floor((pagination.count - 1) / limit) * limit;
      setCurrentOffset(lastOffset);
    }
  };

  const handleRetry = () => {
    list.refetch();
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
          hasPrevious={!!pagination?.previous}
          hasNext={!!pagination?.next}
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
        />
      </div>
      
      <PokemonGrid
        pokemons={combinedData}
        loading={isLoading}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
}