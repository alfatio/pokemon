
export async function fetchPokemon(extraUrl){
    try {

        const res = await fetch(`https://pokeapi.co/api/v2${extraUrl}`,{
            method: 'GET'
        })
        const json = await res.json()
        
        return json

    } catch (error) {
        console.log(error);
        return error
    }
}

export async function fetchPokemonUrl(url){
    try {
        const res = await fetch(`${url}`,{
            method: 'GET'
        })
        const json = await res.json()
        return json

    } catch (error) {
        console.log(error);
        return error
    }
}