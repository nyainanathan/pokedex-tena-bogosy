import { Pokemon } from '@/lib/Types'
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react'

const Card = ({ name , url } : {name : string, url : string}) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {

      if(url.trim() != ""){
        try {
          const response = await fetch(url) ;
          const data = await response.json() as Pokemon;
          setPokemon(data)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching Pokemon:', error)
          setLoading(false)
        }
      } else {
        const localStoragePokemons : Pokemon[] = JSON.parse(localStorage.getItem("pokemons")!);
        for(const pokemon of localStoragePokemons){
          if(pokemon.name == name) {
            setPokemon(pokemon);
            setLoading(false)
          }
        }
      }

    }

    fetchPokemon()
  }, [name, url])

  if (loading) return <div>Loading...</div>
  if (!pokemon) return <div>Undefined</div>

  return (
    <div
      onClick={() => redirect(`/pokemon/${name}`)}
      className="cursor-pointer card-container p-5 rounded-xl border-2 border-transparent hover:border-yellow-400 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
       style={{backgroundColor:'#000814'}} 
    >
      <img
        className="w-37.5 h-37.5 mx-auto"
        src={pokemon.sprites.front_default}
        alt={name}
      />

      <div style={{color:'white'}} className="text-center font-semibold mt-4 text-md capitalize">
        #{pokemon.id} - {name}
      </div>

      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {/* {pokemon.types.map((typeInfo) => {
          const type = typeInfo.type.name
          return (
            <span
              key={type}
              className={`text-xs px-3 py-1 rounded-full font-semibold uppercase text-white `}
            >
              {type}
            </span>
          )
        })} */}
      </div>
    </div>
  )
}

export default Card
