import { createStore,  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initState = {
    catchedPokemon: [],
}
  
const pokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'catch':
        return  { ...state, catchedPokemon: [...state.catchedPokemon, action.payload] }
        case 'release':
            let pokes = state.catchedPokemon.map(el => el)
            pokes = pokes.filter(pokemon => pokemon.id != action.payload)
        return { ...state, catchedPokemon: [...pokes] }
        case 'rename':
            let pokemons = state.catchedPokemon.map(el => el)
            pokemons = pokemons.map(pokemon => {
                console.log(pokemon);
                if(pokemon.id === action.payload.id){
                    pokemon.nickname = action.payload.nickname
                    pokemon.nRename = action.payload.nRename
                } 
                return pokemon
            })
        return { ...state, 
            catchedPokemon: [...pokemons] }
        default:
        return state
    }
}

export default createStore(pokemonReducer, applyMiddleware(thunk))