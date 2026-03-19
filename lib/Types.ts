export interface PokemonType {
    slot : number,
    type : {
        name : string,
        url : string
    }
}

export interface PokemonAbility {
    ability : {
        name : string,
        url : string
    }
}

export interface Pokemon {
    id: number,
    height: number,
    name : string,
    sprites : {
        front_default : string
    },
    weight : number,
    base_experience : number,
    types : PokemonType[],
    abilities : PokemonAbility[]
}