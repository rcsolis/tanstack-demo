export function PokemonItem({ pokemon,}) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded shadow-md">
            <img src={pokemon.picture} alt={pokemon.name} className="w-24 h-24 mb-2" />
            <h2 className="text-lg font-semibold text-black">{pokemon.name}</h2>
            <p className="text-sm text-gray-600">ID: {pokemon.id}</p>
            <p className="text-sm text-gray-600">Height: {pokemon.height}</p>
            <p className="text-sm text-gray-600">Weight: {pokemon.weight}</p>
        </div>
    );
}