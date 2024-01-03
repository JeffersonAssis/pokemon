let detailpoke = document.getElementById("detalhepokemon")


function getid() {
    const id = location.search.substring(1, location.search.length);
    return id
}

const idPoko = getid()
const url = `https://pokeapi.co/api/v2/pokemon/${idPoko}/`

function pokemon(poke) {
    const pokemon = new Pokemon()
    pokemon.number = poke.id
    pokemon.name = poke.name
    const types = poke.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = poke.sprites.other.dream_world.front_default
    const abilities = poke.abilities.map((abilities) => abilities.ability.name)
    pokemon.abilities = abilities;
    const stats  = poke.stats.map((stats) => stats.stat.name)
    const bases = poke.stats.map((stats) => stats.base_stat)
    let b = []
        for (let i = 0; i < stats.length; i++) {
            b.push({ stat: stats[i], base_stat: bases[i] });
        }
    pokemon.stats = b
    return pokemon
}

function pokeDetail(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((responseBoby) => (responseBoby))
        .then((poke) => {
            const poke1 = pokemon(poke)
            const html = `<div class="quem ${poke1.type}">
    <span class="name" id="name">${poke1.name}</span>
    <span class="number" id="number">${poke1.number}</span>
    <img src="${poke1.photo}" alt="${poke1.name}">
    <div class="detail">
        <ol class="types">
            ${poke1.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
    </div>
    <div class="menu-poke ${poke1.type}">
    <nav class="nav-menu">
        <a href="#detalhe">Detalhe</a>
        <a href="#abilities">Abilities</a>
    </nav>
    <div class="detalhe" id="detalhe">
    <ol>
            ${poke1.stats.map(({stat, base_stat})=> `<li class="type">${stat} : ${base_stat}</li>`).join('')}
    </ol>
    </div>
    <div class="abilities" id="abilities">
    <ol>
         ${poke1.abilities.map((ability) => `<li class="type">${ability}</li>`).join('')}
    </ol>
    </div>
    </div>`

            detailpoke.innerHTML = html;
        })
        .catch((erro) => {
            console.error(erro)
        })

}

window.addEventListener('load', () => {
    const menuLinks = document.querySelectorAll('.menu-poke nav a');

    function handleLinkClick(event) {
        const clickedLink = event.currentTarget; // Use 'currentTarget' em vez de 'target'
        const focusedLink = document.querySelector('.menu-poke nav a.focus');

        if (focusedLink) {
            focusedLink.classList.remove('focus');
        }

        clickedLink.classList.add('focus');
    }
})

pokeDetail(url)