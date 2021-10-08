import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { renamePokemon, releasePokemon } from '../store/action'
import { Link } from 'react-router-dom'


function MyList (){
    const catchedPokemon = useSelector(state => state.catchedPokemon)

    

    if(catchedPokemon.length < 1){
        return <div className="empty-page"> No pokemon yet...</div>
    }

    return (
        <div className='home-list'>
            {
                catchedPokemon.map( pokemon => {
                   return <PokemonCard key={pokemon.id} pokemon={pokemon} />
                })
            }
        </div>
    );
}


function PokemonCard(props){
    const dispatch = useDispatch()

    const [nick, setNick] = useState(null)

    const [isRenaming, setIsRenaming] = useState(false)
    const [pokemon] = useState(props.pokemon)

    const handleClickRename = () => {
        setIsRenaming(true)
        let nickPoke = pokemon.nickname.split('-')
        if(pokemon.nRename != 0){
            setNick(nickPoke.slice(0, nickPoke.length - 1).join('-'))
        }else{
            setNick(nickPoke.join(''))
        }
    }

    const handleChange = (e) => {
        setNick(e.target.value)
    }

    const handleRename = async () => {
        try {
            const res = await fetch(`http://localhost:3001/rename`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nick,
                    nRename: pokemon.nRename
                })
            })
            const data = await res.json()
            dispatch(
                renamePokemon({
                    id: pokemon.id,
                    nickname: data.name,
                    nRename: pokemon.nRename + 1
                })
            )
            setIsRenaming(false)
        } catch (err) {
        }
    }

    const handleRelease = async () => {
        try {
            const res = await fetch(`http://localhost:3001/release`,{
                method: 'GET',
            })
            const data = await res.json()
            console.log(data);


            if(data.message == "success"){

                dispatch( releasePokemon(pokemon.id) )

            }else{
                alert('fail to release pokemon')
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    
    

    return (
        <>
            {
                isRenaming ? 
                    <>
                        <div className="popup">
                        </div>
                        <div className="popup-form">
                            <div>
                                <label > rename your pokemon:</label>
                                <input type="text" value={nick} onChange={handleChange} />
                                <button onClick={handleRename}>ok</button>
                            </div>
                        </div>
                    </>
                    :
                    ''
            }

            <div className='list-card'>
                <img src={pokemon.sprites.front_default} alt="" />
                <Link to={`/detail/${pokemon.name}`}>{pokemon.name}</Link>
                <span>nickname: {pokemon.nickname}</span>
                <div>
                    <button onClick={handleClickRename}>rename</button>
                    <button onClick={handleRelease}>release</button>
                </div>
            </div>

        </>
    )
}



export default MyList