import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { fetchPokemon } from '../config/pokeApi'
import { getApi } from '../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { catchPokemon } from '../store/action'


function Details (){
    const catchedPokemon = useSelector(state => state.catchedPokemon)
    const dispatch = useDispatch()

    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [catched, setCatched] = useState(null)
    const [isCatching, setIsCatching] = useState(false)
    const [ givenName, setGivenName ] = useState(null)

    const checkPokemon = () => {
        catchedPokemon.forEach(catched => {
            if(catched.name === name) setCatched(true)
        })
    }
    
    const fetchData = async () => {
        try {
            const data = await fetchPokemon(`/pokemon/${name}`)
            setPokemon(data)
            setGivenName(data.name)
            
        } catch (err) {
            console.log(err);
        }
    }

    const handleCatch = async () => {
        setIsCatching(true)
        try {
            const data = await getApi("/catch")
        
            if(data.message === "success"){
                setCatched(true)
            }else{
                alert(`failed to catch ${pokemon.name}`)
                setIsCatching(false)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeName = (e) => {
        setGivenName(e.target.value)
    }

    const handleOK = () => {
        let p = {...pokemon, nickname: givenName, nRename: 0}
        setPokemon(p)
    }

    useEffect(() => {
        fetchData()
        checkPokemon()
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(isCatching){
            dispatch(catchPokemon(pokemon))
            checkPokemon()
            setIsCatching(false)
        }
        
    },[pokemon])



    if (pokemon == null || Object.keys(pokemon).length == 0){
        return <div className="empty-page"> No pokemon yet...</div>
    }

    return (
        <>
            {
                catched == true && isCatching ?
                <>
                    <div className="popup">
                    </div>
                    <div className="popup-form">
                        <div>
                            <div>
                                you successfully catch {pokemon.name}
                            </div>
                            <label > name your pokemon:</label>
                            <input type="text" value={givenName} onChange={handleChangeName} onSubmit={handleOK}/>
                            <button onClick={handleOK}>ok</button>
                        </div>
                    </div>
                </>
                :
                ""
            }
            <div className="pokemon-card">
                <div>
                    <img src={pokemon?.sprites?.front_default} alt="404" />
                    {
                        catched === null ?
                        <button onClick={handleCatch} disabled={isCatching}>catch</button>
                        :
                        <span>already catched</span>
                    }
                    <span>{pokemon?.name}</span>

                    <div className="pokemon-list-types">
                        <span>types:</span>
                        <div>
                            {
                                pokemon.types?.map(type => {
                                    return <span key={type.type.name}>
                                        {type.type.name}
                                    </span>
                                })
                            }
                        </div>
                    </div>

                    <div className="pokemon-list-types">
                        <span>moves:</span>
                        <div>
                            {
                                pokemon.moves?.map(move => {
                                    return <span key={move.move.name}>
                                        {move.move.name}
                                    </span>
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Details