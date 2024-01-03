const pokoApi = {}

function convertPokoApiToModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokoApi.getPokeDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response)=>response.json())
    .then((convertPokoApiToModel))
 }
 
pokoApi.getPokemos = (offset ,limit ) =>{
     const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
     
     return fetch(url)
     .then((response) => response.json())
     .then((jsonBody) => jsonBody.results)
     .then((pokemons) => pokemons.map(pokoApi.getPokeDetail))
     .then((detailresquests)=>Promise.all(detailresquests))
     .then((pokemonDetail)=> pokemonDetail) 
 }