
export const fetchPokemons = async (url, addPokemon, setLinks, setPaginationInfo) => {
    try{
        if(!url) {
            url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
        }
        console.log("Fetching pokemons from:", url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Get links for pagination
        const previousLink = data.previous;
        const nextLink = data.next;
        setLinks(previousLink, nextLink);
        
        // Calculate pagination info
        const totalCount = data.count;
        const limit = 20; // Default limit
        const totalPages = Math.ceil(totalCount / limit);
        const currentOffset = url.includes('offset=') ? parseInt(url.split('offset=')[1].split('&')[0]) : 0;
        const currentPage = Math.floor(currentOffset / limit) + 1;
        
        setPaginationInfo(currentPage, totalPages, totalCount);
        
        // Update the Zustand store with the fetched pokemons
        data.results.map(pokemon => {
            const newPokemon = {
                name: pokemon.name,
                url: pokemon.url
            };
            // Fetch details for each pokemon
            return fetchPokemonDetails(newPokemon.url)
        }).forEach(async (pokemonPromise) => {
            try {
            const newPokemon = await pokemonPromise;
            // Add the pokemon to the store
            newPokemon.id = newPokemon.id.toString(); // Ensure id is a string
            newPokemon.picture = newPokemon.picture || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png";
            newPokemon.height = newPokemon.height || 0;
            newPokemon.weight = newPokemon.weight || 0;
            // Add the pokemon to the store
            console.log("Adding pokemon:", newPokemon);
            addPokemon(newPokemon);
            } catch (error) {
                console.error("Error fetching pokemon details:", error);
            }
        });
        return true; // Indicate success
    }catch(error){
        console.error("Error fetching pokemons:", error);
        throw error;
    }

};

export const fetchPokemonDetails = async (url) => {
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            picture: data.sprites.front_default
        };
    }catch(error){
        console.error("Error fetching pokemon details:", error);
        throw error;
    }
}

export const generateFirstPageUrl = (limit = 20) => {
    return `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
};

export const generateLastPageUrl = (totalCount, limit = 20) => {
    const lastOffset = Math.floor((totalCount - 1) / limit) * limit;
    return `https://pokeapi.co/api/v2/pokemon?offset=${lastOffset}&limit=${limit}`;
};