'use client'

import Card from "@/components/PokemonCard";
import { useEffect, useState } from "react";

interface fetchResult {
    name: string,
    url : string
};

const CardsContainer = () => {

    const [pokemonList, setPokemonList] = useState<fetchResult[]>([]);
    const [searchParams, setSearchParams] = useState("");
    const [researchedPokemon, setResearchedPokemon] = useState<fetchResult[]>([]);
    const [displayCount, setDisplayCount] = useState(9);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try {
                const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
                const parsedData = await data.json();
                setPokemonList(parsedData.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllPokemons();
    }, []);

    useEffect(() => {
        const filteredPokemons = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchParams.toLowerCase())
        );
        setResearchedPokemon(filteredPokemons);
        setDisplayCount(9); 
    }, [searchParams, pokemonList]);

    const handleNext = () => {
        setDisplayCount((prev) => prev + 9);
    };

    const pokemonsToDisplay = researchedPokemon.slice(0, displayCount);

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-8 bg-[#0b1c34]">
              <input type="text" 
                placeholder="Enter a pokemon name ..." 
                onChange={(e) => setSearchParams(e.target.value)}
                style={{backgroundColor:'#000814',width:'25%' , padding:'2ch',border:'2px solid gold',borderRadius:'20px' , color:'white' }}
        />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 w-full max-w-6xl px-4 mx-auto">
                {pokemonsToDisplay.map((pokemon, index) => (
                    <Card name={pokemon.name} url={pokemon.url} key={index} />
                ))}
            </div>

            {displayCount < researchedPokemon.length && (
                <button
                    onClick={handleNext}
                    className="mt-10 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default CardsContainer;