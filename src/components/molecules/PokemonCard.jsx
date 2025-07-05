import { Card } from '../atoms/Card';
import { Image } from '../atoms/Image';
import { Text } from '../atoms/Text';

export function PokemonCard({ pokemon }) {
  return (
    <Card 
      variant="elevated" 
      padding="medium" 
      hover={true}
      className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm transition-transform duration-200"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3">
        <Image 
          src={pokemon.picture} 
          alt={pokemon.name}
          width="100%"
          height="100%"
          className="rounded-lg"
        />
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
          <Text variant="small" color="muted">
            Height: {pokemon.height}
          </Text>
          <Text variant="small" color="muted">
            Weight: {pokemon.weight}
          </Text>
        </div>
      </div>
    </Card>
  );
}