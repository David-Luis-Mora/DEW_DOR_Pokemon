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


// Función que maneja la selección de cartas
const selectPokemon = (event) => {
    const card = event.currentTarget;
    const pokemonId = card.getAttribute('data-pokemon-id');
    console.log("he selecionado un pokemon")

    // card.classList.add('seleccionado');

    // Comprobar si el Pokémon ya está en la lista de seleccionados
    // if (selectedPokemons.includes(pokemonId)) {
    //     // Si ya está seleccionado, desmarcar y quitar de la lista
    //     selectedPokemons = selectedPokemons.filter(id => id !== pokemonId);
    //     card.classList.remove('selected');
    // } else {
    //     // Si no está seleccionado, marcar y añadir a la lista
    //     selectedPokemons.push(pokemonId);
    //     card.classList.add('selected');
    // }
};


// // Función para añadir los Pokémon seleccionados a la lista de deseos
// const addToWishlist = () => {
//     if (selectedPokemons.length === 0) {
//         alert("No has seleccionado ningún Pokémon.");
//         return;
//     }
//     alert(`Has añadido ${selectedPokemons.length} Pokémon a tu lista de deseos.`);
// };



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

        //
        pokedex.innerHTML += `
            <div class="card" data-pokemon-id="${pokemons[i].id}>
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               
               
               
            </div>`;
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', selectPokemon);
        });

        
    }
};






// David
// Acuerdate de quitar los pesos en todo los filtros
/* <div class="weight">
               ${pokemons[i].weight} 
               </div> */

/* <div class="stats">
               ${pokemons[i].stats[0].base_stat} 
               </div> */



function filtro_tipo(){
    console.log("Estoy escribiendo en la consola")
    let letras = document.getElementById("filtro_tipo").value;
    let weight = parseFloat(document.getElementById("filtro_weight").value);
    let stats = parseFloat(document.getElementById("filtro_stats").value)
    const pokedex = document.getElementById("pokedex");
    console.log(stats);
    



    pokedex.innerHTML = "";
    // console.log(weight);
   
    if(isNaN(weight)){
        weight = 999999999
    }

    if (isNaN(stats)){
        stats = 999999999
    }
    // console.log(weight);
    
    for (var i = 0; i < pokemons.length; i++){
        var aux = 0;
        let acumulador_stats = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        for(let j=0; j <pokemons[i].stats.length; j++){
            acumulador_stats += pokemons[i].stats[j].base_stat;

        }
        if (tipo1.includes(letras) && pokemons[i].weight <= weight && acumulador_stats <= stats){            
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }
        if (tipo2.includes(letras) && pokemons[i].weight <= weight && acumulador_stats <= stats){
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }

    };
    const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', selectPokemon);
        });


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


function filtro_weight(){
    // console.log("Estoy escribiendo en la consola")
    let letras = document.getElementById("filtro_tipo").value;
    let num = parseFloat(document.getElementById("filtro_weight").value);
    let stats =  parseFloat(document.getElementById("filtro_stats").value)
    const pokedex = document.getElementById("pokedex");
    console.log(num)
    pokedex.innerHTML = "";
    if(isNaN(num)){
        num = 999999999
    }

    if (isNaN(stats)){
        stats = 999999999
    }

    for (var i = 0; i < pokemons.length; i++){
        // console.log(pokemons[i].weight)
        var aux = 0;
        let acumulador_stats = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        for(let j=0; j <pokemons[i].stats.length; j++){
            acumulador_stats += pokemons[i].stats[j].base_stat;

        }
        if (tipo1.includes(letras) && pokemons[i].weight <= num && acumulador_stats <= stats){            
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }
        if (tipo2.includes(letras) && pokemons[i].weight <= num && acumulador_stats <= stats){
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }

    };

}



function filtro_stats(){
    // console.log("Estoy escribiendo en la consola")
    let letras = document.getElementById("filtro_tipo").value;
    let num = parseFloat(document.getElementById("filtro_weight").value);
    let stats =  parseFloat(document.getElementById("filtro_stats").value)
    const pokedex = document.getElementById("pokedex");
    console.log(num)
    pokedex.innerHTML = "";
    if(isNaN(num)){
        num = 999999999
    }

    if (isNaN(stats)){
        stats = 999999999
    }

    for (var i = 0; i < pokemons.length; i++){
        // console.log(pokemons[i].weight)
        var aux = 0;
        let acumulador_stats = 0;
        while (aux != pokemons[i].pkm_type.length) {
            if (aux == 0) var tipo1 = pokemons[i].pkm_type[aux].type.name;
            if (aux == 1) var tipo2 = pokemons[i].pkm_type[aux].type.name;
            else tipo2 = "";
            aux++;
        }
        for(let j=0; j <pokemons[i].stats.length; j++){
            acumulador_stats += pokemons[i].stats[j].base_stat;

        }
        if (tipo1.includes(letras) && pokemons[i].weight <= num && acumulador_stats <= stats){            
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }
        if (tipo2.includes(letras) && pokemons[i].weight <= num && acumulador_stats <= stats){
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
               <div class="weight">
               ${pokemons[i].weight} 
               </div>
               <div class="stats">
               ${acumulador_stats} 
               </div>
            </div>`;
            continue
        }

    };

}


const filtro_tipo_ = document.getElementById("filtro_tipo")
filtro_tipo_.addEventListener('keypress',filtro_tipo)


const filtro_weight_ = document.getElementById("filtro_weight")
filtro_weight_.addEventListener('input',filtro_weight)


const filtro_stats_ = document.getElementById("filtro_stats")
filtro_stats_.addEventListener('input',filtro_stats)









// function selectCard(){
//     console.log("He seleciona una carta")
// }



// const cards = document.querySelectorAll('card');
// cards.forEach(card => {
//     card.addEventListener('click', selectCard);
// });



// const cards = document.querySelectorAll('.card');
//         cards.forEach(card => {
//             card.addEventListener('click', selectPokemon);
//         });














// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAV9d4KTlk3-75SZ7dWUvDj4InxZ_QuKCc",
//   authDomain: "compra-pokemon-86250.firebaseapp.com",
//   projectId: "compra-pokemon-86250",
//   storageBucket: "compra-pokemon-86250.appspot.com",
//   messagingSenderId: "887503594687",
//   appId: "1:887503594687:web:12672a053bf4d36e55d20a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

