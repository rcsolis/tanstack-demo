import { Card } from '../atoms/Card';
import { Image } from '../atoms/Image';
import { Text } from '../atoms/Text';

export function PokemonCard({ pokemon }) {
  // Handle both old and new data structure
  const pokemonData = pokemon.details || pokemon;
  const isLoading = !pokemon.details && pokemon.id; // Loading if we have basic info but no details
  
  return (
    <Card 
      variant="elevated" 
      padding="medium" 
      hover={true}
      className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm transition-transform duration-200"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Image 
            src={pokemonData.picture} 
            alt={pokemon.name}
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        )}
      </div>
      
      <div className="text-center space-y-1">
        <Text 
          variant="h5" 
          weight="semibold" 
          className="capitalize"
        >
          {pokemon.name}
        </Text>
        
        <div className="space-y-0.5">
          <Text variant="small" color="muted">
            ID: {pokemon.id}
          </Text>
          {isLoading ? (
            <>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </>
          ) : (
            <>
              <Text variant="small" color="muted">
                Height: {pokemonData.height}
              </Text>
              <Text variant="small" color="muted">
                Weight: {pokemonData.weight}
              </Text>
              {pokemonData.types && pokemonData.types.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {pokemonData.types.map(type => (
                    <span 
                      key={type}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}