import React, { useState, useEffect} from "react";
import { fetchPokemon } from '../config/pokeApi'
import { Link } from 'react-router-dom'

function Home (){
    const [pokemons, setPokemons] = useState([])


    const fetchData = async () => {
        try {
            const data = await fetchPokemon('/pokemon')
            setPokemons(data.results)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    if (pokemons.length < 1){
        return <div className="empty-page"> No pokemon yet...</div>
    }

    return (
        <div className="home-list">
            {
                pokemons.map((pokemon, i) => {
                    return  <>
                        <PokeCard key={pokemon.name} pokemon={pokemon}/>
                    </>
                })
            }
        </div>
    );
}

function PokeCard(props){

    const [pokemon, setPokemon] = useState(null)


    const fetchData = async () => {
        try {
            const data = await fetchPokemon(`/pokemon/${props.pokemon.name}`)
            
            setPokemon(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    if(pokemon == null){
        return <div className="empty-page"> No pokemon yet...</div>
    }

    return (
        <div className='list-card'>
            <img src={pokemon.sprites.front_default} alt="" />
            <Link to={`/detail/${pokemon.name}`}>{pokemon.name}</Link>
        </div>
    )
}

export default Home
