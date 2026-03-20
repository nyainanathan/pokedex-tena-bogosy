export interface PokemonType {
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
}

export interface PokemonTypesRes {
    results : {
        name : string,
        url : string
    }
}