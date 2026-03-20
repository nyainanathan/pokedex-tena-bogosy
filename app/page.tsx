'use client'

import Card from "@/components/PokemonCard";
import { PokemonAbility, PokemonType, PokemonTypesRes } from "@/lib/Types";
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
    const [creatingMode, setCreatingMode] = useState(true);

    const [allTypes, setAllTypes] = useState<PokemonTypesRes[]>();
    const [allAbilities, setAllAbilities] = useState<PokemonAbility[]>();

    const [pokeHeight, setPokeHeight] = useState<number>(0);
    const [pokeName, setPokename] = useState<string>("");
    const [pokeWeight, setPokeWeight] = useState<number>(0);

    const clearCreatingVariables = () => {
        setPokeHeight(0);
        setPokename("");
        setPokeWeight(0);
    }

    const fetchAllPokemons = async () => {
        try {
            const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
            const parsedData = await data.json();
            setPokemonList(parsedData.results);
        } catch (err) {
            console.error(err);
        }
    };

    //Fetch every available pokemon and types
    useEffect(() => {
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
            <div className="w-1/2 flex items-center p-1 justify-center gap-2">
              <input type="text" 
                placeholder="Enter a pokemon name ..." 
                onChange={(e) => setSearchParams(e.target.value)}
                style={{width:'50%' , padding:'2ch',border:'2px solid gold',borderRadius:'20px' }}
                className="bg-amber-100 text-black"
                 />

                <button
                className="bg-amber-100 p-3 rounded-2xl"
                >
                    Create
                </button>
                
            </div>

            {
                creatingMode && (
                    <div className  ="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                        <div className ="bg-white p-6 rounded-2xl shadow-xl">
                            <p>Let's create a new pokemon together</p>
                            <p>Please insert the information about you pokemon</p>

                            <div>
                                <label htmlFor="name">Name: </label>
                                <input type="text" name="name" id="name" />
                            </div>

                            <div>
                                <label htmlFor="height">Height: </label>
                                <input type="number" name="height" id="height" />
                            </div>


                            <div>
                                <label htmlFor="weight">Weight: </label>
                                <input type="number" name="weight" id="weight" />
                            </div>

                        </div>
                    </div>
                )
            }

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