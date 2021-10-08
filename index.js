let pokeCard = document.querySelector('[data-card]');
let pokeName = document.querySelector('[data-nombre]');
let pokeImg = document.querySelector('[data-img]');
let pokeImgContainer = document.querySelector('[data-cont]');
let pokeId = document.querySelector('[data-id]');
let pokeTypes = document.querySelector('[data-tipo]');
let pokeStats = document.querySelector('[data-stats]');



let typeColors = {
    
    flying: '#7AE7C7',
    ghost: '#561D25',
    water: '#0596C7',
    ice: '#AFEAFD',
    ground: '#D2B074',
    dragon: '#DA627D',
    bug: '#A2FAA3',
    grass: '#4A9681',
    normal: '#B09398',
    rock: '#999799',
    poison: '#795663',
    psychic: '#FFC6D9',
    fighting: '#2F2F2F',
    electric: '#FFEA70',
    fire: '#FF675C',
    steel: '#1D8A99',
    default: '#2A1A1F',

};


let buscar = event => {
    event.preventDefault();
    let { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => pdata(response))
        .catch(err => notfound())
}

let pdata = data => {
    let sprite =  data.sprites.front_default;
    let { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    cardcolor(types);
    ptipo(types);
    pstats(stats);
    fondo(types);
}

let cardcolor = types => {
    let colorOne = typeColors[types[0].type.name];
    let colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
    
}

let ptipo = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        let typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

let pstats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        let statel = document.createElement("div");
        let statnom = document.createElement("div");
        let statcant = document.createElement("div");
        statnom.textContent = stat.stat.name;
        statnom.style.fontSize = `15px`;
        statcant.textContent = stat.base_stat;
        statcant.style.fontSize = `15px`;
        statel.appendChild(statnom);
        statel.appendChild(statcant);
        pokeStats.appendChild(statel);
    });
}



let notfound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'pokesom.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

let fondo = types=>{
    let color = typeColors[types[0].type.name];
    
    document.body.style.backgroundColor = color;
    pokeCard.style.backgroundColor = `#EBF5F0`;
    
    

}

