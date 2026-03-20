'use client'

import Card from "@/components/PokemonCard";
import { Pokemon, PokemonAbility, PokemonType, PokemonTypesRes } from "@/lib/Types";
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
    const [creatingMode, setCreatingMode] = useState(false);

    const [pokeHeight, setPokeHeight] = useState<number>(67);
    const [pokeName, setPokename] = useState<string>("");
    const [pokeWeight, setPokeWeight] = useState<number>(5);

    const clearCreatingVariables = () => {
        setPokeHeight(67);
        setPokename("");
        setPokeWeight(5);
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

    const handleCreation = () => {

        if(pokeName.trim() != ""){
            
            const newPokemon : Pokemon = {
                id : pokemonList.length + 1,
                height : pokeHeight,
                weight: pokeWeight,
                name : pokeName, 
                sprites : {
                    front_default: "data:image/jpeg;base64,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"
                }
            }

            const areTherePokemons = localStorage.getItem("pokemons");

            if(!areTherePokemons){
                localStorage.setItem("pokemons", JSON.stringify([]));
            }

            let inBrowserPokemons : Pokemon[] = JSON.parse(localStorage.getItem("pokemons")!);
            inBrowserPokemons.push(newPokemon);

            localStorage.removeItem("pokemons");

            localStorage.setItem("pokemons", JSON.stringify(inBrowserPokemons));

            alert("Pokemon created")
            clearCreatingVariables();
            setCreatingMode(false);
        } else {
            alert("Please set a name for the new pokemon!")
        }
    }

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
                onClick={()=> setCreatingMode(true)}
                >
                    Create
                </button>
                
            </div>

            {
                creatingMode && (
                    <div className  ="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                        <div className ="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center gap-5">
                            <p
                                className="text-2xl"
                            >Let's create a new pokemon together</p>

                            <div className="flex flex-col gap-3">
                                
                                <div className="p-2">
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" id="name"
                                    value={pokeName} onChange={(e) => setPokename(e.target.value)}
                                    />
                                </div>

                                <div className="p-2"
                                >
                                    <label htmlFor="height">Height (cm) : </label>
                                    <input type="number" name="height" id="height" 
                                    value={pokeHeight} onChange={(e) => setPokeHeight(Number(e.target.value))}
                                    />
                                </div>


                                <div className="p-2" >
                                    <label htmlFor="weight">Weight (kg): </label>
                                    <input type="number" name="weight" id="weight" 
                                    value={pokeWeight} onChange={(e) => setPokeWeight(Number(e.target.value))}
                                    />
                                </div>
                            </div>


                            <div className="flex gap-10">
                                <button
                                className="p-3 rounded-2xl bg-green-200"
                                onClick={handleCreation}
                                >
                                    CREATE!
                                </button>

                                <button
                                className="p-3 rounded-2xl bg-red-200"
                                onClick={()=> {
                                    clearCreatingVariables();
                                    setCreatingMode(false);
                                }}
                                >
                                    CANCEL!
                                </button>
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