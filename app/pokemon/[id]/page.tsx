'use client';

import { Pokemon } from '@/lib/Types';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonDetails({ params }: { params: Promise<{ id: string }> }) {

  const { id: pokemonId } = use(params);

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {

      let isLocalStoragePokemon : boolean = false;

      const localStoragePokemons : Pokemon[] = JSON.parse(localStorage.getItem("pokemons")!);
        for(const pokemon of localStoragePokemons){
          if(pokemon.name == pokemonId) {
            isLocalStoragePokemon = true;
            setPokemon(pokemon);
            setLoading(false)
          }
        }

      if(!isLocalStoragePokemon){
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const data = await response.json();
          setPokemon(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching Pokemon details:', error);
          setLoading(false);
        }
      }

    };
    fetchPokemon();
  }, [pokemonId]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <>
      <div>
        <div style={{ margin: 'auto', marginTop: '25ch', border: '2px solid gold', width: '20%', textAlign: 'center', backgroundColor: '#000814', color: 'white', boxShadow: '0px 0px 10px black', borderRadius: '20px' }}>

          <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
          <img
            className="w-48 h-48 rounded-2xl mb-4"
            style={{ margin: 'auto' }}
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <div className="text-lg">
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          </div>

          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}