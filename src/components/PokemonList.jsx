import { usePokemonStore } from "../store/pokemonStore";
import { fetchPokemons } from "../service/pokemonService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loading } from "./ui/Loading";
import { Error } from "./ui/Error";
import { PokemonItem } from "./ui/PokemonItem";

export function PokemonList(){
    const {url, setUrl} = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
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

    console.log("POKEMON SOURCE:", url);

    const query = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => fetchPokemons(url, addPokemon, setLinks),
    });

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-fit">
            <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
            <div className="flex justify-between w-full mb-4">
                <button 
                    onClick={handlePrevious}
                    disabled={!previousLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    
                    <Icon icon="line-md:arrow-left-circle-twotone" width="24" height="24" />
                    Previous
                </button>
                <button 
                    onClick={handleNext}
                    disabled={!nextLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                    <Icon icon="line-md:chevron-right-circle-twotone" width="24" height="24" />
                </button>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-4">
                {
                    (query.isLoading)?<Loading />:(query.isError)?(
                        <Error message={query.error.message} />
                    ):(
                        pokemons.map(pokemon => (
                            <PokemonItem key={pokemon.id} pokemon={pokemon} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

