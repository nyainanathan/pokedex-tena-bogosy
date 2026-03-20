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
            
            if(localStorage.getItem('pokemons')){

                const apiPokemons : fetchResult  = parsedData.results;

                const localStoragePokemons : Pokemon[] = JSON.parse(localStorage.getItem('pokemons')!);
                const localStoragePokemonsUrl : fetchResult [] = localStoragePokemons.map( p => {
                    return {
                        name : p.name,
                        url : ""
                    }
                });

                const allThosePokemons : fetchResult[] = localStoragePokemonsUrl.reverse().concat(apiPokemons);
                setPokemonList(allThosePokemons);
            } else {
                setPokemonList(parsedData.results);
            }

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
                    front_default : "/pngwing.com.png"
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

            fetchAllPokemons();

            alert("Pokemon created");
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