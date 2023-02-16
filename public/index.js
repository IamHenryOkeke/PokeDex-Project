const searchBtn = document.getElementById("search")
const loading = document.getElementById("loading")
const pokemonContainer = document.getElementById("pokemon-container")
const pokemonDetailsContainer = document.getElementById("pokemon-details-container")
const pokemonImageContainer = document.getElementById("pokemon-image-container")

const populatePokemon = (data) => {
    const pokemonImg = document.createElement("img");
    const pokemonName = document.createElement("h1");
    const speciesText = document.createElement("p");
    const pokemonHeight = document.createElement("p");
    const pokemonWeight = document.createElement("p");
    const pokemonBaseExperience = document.createElement("p");


    pokemonImg.src = `${data.imgSrc}`
    pokemonImg.classList.add("h-[300px]", "md:h-[400px]")
    pokemonName.textContent = data.name
    pokemonName.classList.add("text-3xl","md:text-5xl", "text-red-500")
    speciesText.textContent = "Species"
    pokemonBaseExperience.textContent = `Base Experience: ${data.base_exp}EXP`
    pokemonHeight.textContent = `Height: ${data.height}`
    pokemonWeight.textContent = `Weight: ${data.weight}`

    pokemonImageContainer.appendChild(pokemonImg)
    pokemonDetailsContainer.appendChild(pokemonName)
    pokemonDetailsContainer.appendChild(speciesText)
    pokemonDetailsContainer.appendChild(pokemonHeight)
    pokemonDetailsContainer.appendChild(pokemonWeight)
    pokemonDetailsContainer.appendChild(pokemonBaseExperience)
}

const getNeededData = (data) => {
    return {
        imgSrc: data.sprites.other["official-artwork"].front_default,
        name: data.name,
        height: data.height,
        weight: data.weight,
        base_exp : data.base_experience
    }
}

const getPokemonData = () => {
    let pokemonName = document.querySelector("input").value;
    pokemonName === ""
        ? (pokemonName = "chewtle")
        : (pokemonName = document.querySelector("input").value);
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    loading.classList.replace("hidden", "flex")
    setTimeout(() => {
        fetch(apiURL)
            .then(res =>
                res.json()
            ).then(data => {
                console.log(data)
                pokemonContainer.classList.replace("hidden", "flex")
                pokemonDetailsContainer.innerHTML = ""
                pokemonImageContainer.innerHTML = ""
                populatePokemon(getNeededData(data))
            }
            ).catch(err => {
                console.log(err.message)
            })
        loading.classList.replace("flex", "hidden")
    }, 1000)
}

searchBtn.addEventListener("click", getPokemonData)