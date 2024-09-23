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

    mostrarPOkemon()



});


function mostrarPOkemon(){
    document.querySelector(".cargandoDatos").style.visibility = "visible";
    
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", (e) => {
        if (e.target.readyState === 4){
            const datos = JSON.parse(e.target.responseText);
            console.log(datos);


        }
    })
    // request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/');
    request.send();
    

    
}


// button.addEventListener("click", ()=> {
//     // alert("Me han pulsado. Hola!");
//     document.querySelectorAll("#btn_lista_deseo").forEach( (e) => {
//         // console.log(e)
//         e.style.visibility = "visible";
//         // e.visibility = 
//     })
// });


// button.addEventListener("click", ()=> {
//     // alert("Me han pulsado. Hola!");
//     document.querySelectorAll(".listaPokemon").forEach( (e) => {
//         console.log(e)
//         e.style.visibility = "visible";
//         // e.visibility = 
//     })
// });



