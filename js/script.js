// Importamos la clase Pokemon
import Pokemon from "./Pokemon.js";

// Creo el array
const pokemons = [];

// Selecciono boton del DOM
const button = document.querySelector("button");

function showConsole() {
    //Mostrar filtros
    document.querySelectorAll("#filtro").forEach((e) => {
        //console.log(e);
        e.style.visibility = "visible";
    });

    // Mostrar botones
    document.querySelectorAll("#btn_lista_deseo").forEach((e) => {
        //console.log(e);
        e.style.visibility = "visible";
    });
}

button.addEventListener("click", () => {
    // Mostrar lista Pokemon
    document.querySelector("#pokedex").style.visibility = "visible";;

    startPokemon();

});


const startPokemon = async () => {
    document.querySelector(".cargandoDatos").style.visibility = "visible";
    for (var i = 1; i <= 151; i++) {
        try {
            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
                .then(function (result) {
                    return result.json();
                })
                .then(function (data) {
                    //console.log(data);
                    const pokemon = new Pokemon(data); // Instancio la clase
                    //console.log(pokemon);
                    pushPokemon(pokemon); // Guardo pokemon en array
                })
        } catch (error) {
            alert(`There is am error: ${error}`)
        }
    }

    for (var i = 0; i < pokemons.length; i++) {
        let numero = Math.floor(Math.random() * 1000) + 1;
        pokemons[i].precio = numero;
        
    }

    await showPokedex();

};

function pushPokemon(pokemon) {
    pokemons.push(pokemon);
}

const showPokedex = async () => {
    //console.log(pokemons);
    // Hago visible la lista
    document.querySelector("#pokedex").style.visibility = "visible";

    const pokedex = document.getElementById("pokedex");

    document.querySelector(".cargandoDatos").style.visibility = "hidden";
    showConsole();
    button.style.visibility = "hidden";
    console.log(pokemons)
    for (var i = 0; i < pokemons.length; i++) {
        var aux = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        // let numero = Math.floor(Math.random() * 1000) + 1
        pokedex.innerHTML += `
            <div class="card">
               <img src="${pokemons[i].pkm_back}">
               <img src="${pokemons[i].pkm_front}">
               <br>
               ${pokemons[i].id}. ${pokemons[i].name}
               <br>
               <div class="types">
               ${tipo1}  ${tipo2} 
               </div>
               <div class="precio">
               ${pokemons[i].precio} 
               </div>
            </div>`;
    }
};


// David



function mostrarFiltro(){
    console.log("Estoy escribiendo en la consola")
    let letras = document.getElementById("filtro_tipo").value;
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = "";
    for (var i = 0; i < pokemons.length; i++){
        var aux = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        if (tipo1.includes(letras)){            
            pokedex.innerHTML += `
            <div class="card">
               <img src="${pokemons[i].pkm_back}">
               <img src="${pokemons[i].pkm_front}">
               <br>
               ${pokemons[i].id}. ${pokemons[i].name}
               <br>
               <div class="types">
               ${tipo1}  ${tipo2} 
               </div>
               <div class="precio">
               ${pokemons[i].precio} 
               </div>
            </div>`;
            continue
        }
        if (tipo2.includes(letras)){
            pokedex.innerHTML += `
            <div class="card">
               <img src="${pokemons[i].pkm_back}">
               <img src="${pokemons[i].pkm_front}">
               <br>
               ${pokemons[i].id}. ${pokemons[i].name}
               <br>
               <div class="types">
               ${tipo1}  ${tipo2} 
               </div>
               <div class="precio">
               ${pokemons[i].precio} 
               </div>
            </div>`;
            continue
        }

    };

    // let lista_pokemon = pokemons.filter(objecto => objecto.pkm_type[0].type.name.toLowerCase().includes(letras.toLowerCase()));
   
    // console.log(lista_pokemon);
    // for (var i = 0; i < lista_pokemon.length; i++) {
    //     var aux = 0;
    //     while (aux != lista_pokemon[i].pkm_type.length) {
    //         if (aux == 0) var tipo1 = lista_pokemon[i].pkm_type[aux].type.name;
    //         if (aux == 1) var tipo2 = lista_pokemon[i].pkm_type[aux].type.name;
    //         else tipo2 = "";
    //         aux++;
    //     }
    //     // let numero = Math.floor(Math.random() * 1000) + 1
        
    // }






    


}



const filtro_tipo = document.getElementById("filtro_tipo")
filtro_tipo.addEventListener('keypress',mostrarFiltro)

