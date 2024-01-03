const pokemonList = document.getElementById("pokemons");
const loadBtn = document.getElementById("load")
const limit = 2;
let offset = 0;
const maxRecord = 160;

function loadPokemon(offset,limit){
pokoApi.getPokemos(offset,limit).then((pokemons =[]) =>{
        const newHtml = pokemons.map((pokemon) => `
        <a href="detalhe.html?${pokemon.number}">
        <li class="pokemon ${pokemon.type}">
                    <span class="number" id="number">#${pokemon.number}</span>
                    <span class="name" id="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img id="img-pokemon" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>   
                </li>  </a> 
        `).join("") 
        pokemonList.innerHTML += newHtml
     })
     .catch((erro) => console.log(erro));
    }

    loadPokemon(offset, limit)

    loadBtn.addEventListener("click", () =>{
        offset+=limit
        const qtRecord = offset + limit
        if(qtRecord >= maxRecord){
            const newlimit = maxRecord - offset;
            loadPokemon(offset,newlimit)
            loadBtn.parentElement.removeChild(loadBtn)
        }else{
        loadPokemon(offset,limit)
         }
    }) 

   