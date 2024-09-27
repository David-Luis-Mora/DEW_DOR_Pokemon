
import Pokemon from "./Pokemon.js";

const pokemons = [];

// Selecciono boton del DOM
const button = document.querySelector("button");

button.addEventListener("click", ()=> {
    // alert("Me han pulsado. Hola!");
    document.querySelectorAll("#filtro").forEach( (e) => {

        // console.log(e)
        e.style.visibility = "visible";
    });

    document.querySelectorAll("#btn_lista_deseo").forEach( (e) => {
                // console.log(e)
                e.style.visibility = "visible";
    });

    document.querySelectorAll(".listaPokemon").forEach( (e) => {
                // console.log(e)
                e.style.visibility = "visible";
            })

    startPokemon();



});




const startPokemon = async () => {

    for(var i = 1; i<=151;i++){
        try{
            await fetch("https://pokeapi.co/api/v2/pokemon/"+i+"/")
            .then(function(result){
                return result.json();

            })
            .then(function(data){
                console.log(data);
                const pokemon = new Pokemon(data);
                pushPokemon(pokemon);
            })
        } catch (error){
            alert(`There is am error: ${error}`)

        }

    }

    await showPokedex();
};



function pushPokemon (pokemon){
    pokemons.push(pokemon);
};


const showPokedex = async () => {
    // console.log(pokemon)
    document.querySelector("#pokedex").style.visibility = "visable";

    const pokedex = document.getElementById("pokedex");

    for (var i=0; i< pokemons.length; i++){
        var aux = 0;
        while (aux != pokemons[i].pkm_type.length){
           if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
           if (aux ==1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
           else tipo2 = "";
           aux++;

        }
        
        const card = document.createElement("div");
        card.classList.add("card")
        


        let random = parseInt(Math.random() * (1-1000+1)+1);
        console.log(random)
        pokedex.innerHTML += `<div class="card">
                                    <img src="${pokemons[i].pkm_back}">
                                    <img src="${pokemons[i].pkm_front}">
                                    <br>
                                    ${pokemons[i].id}. ${pokemons[i].name}
                                    <br>
                                    <div class="types">
                                        ${tipo1} ${tipo2}
                                    </div>
                                    <div class="precies">
                                        ${random * -1}
                                    </div>
                                </div>`
    }


};

function selected(){
    alert("Hola")
}