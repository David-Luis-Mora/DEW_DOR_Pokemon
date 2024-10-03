// Ejecutar esto primero antes de ver la pagina
// npm install -g live-server
// live-server


 
 
 
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAV9d4KTlk3-75SZ7dWUvDj4InxZ_QuKCc",
   authDomain: "compra-pokemon-86250.firebaseapp.com",
   projectId: "compra-pokemon-86250",
   storageBucket: "compra-pokemon-86250.appspot.com",
   messagingSenderId: "887503594687",
   appId: "1:887503594687:web:12672a053bf4d36e55d20a"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);



import { getFirestore, collection, doc, addDoc , getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const db = getFirestore(app); // Inicializa Firestore

// Función para obtener un documento específico
async function obtenerDocumento() {
  const docRef = doc(db, "lista", "0"); // Reemplaza "0" con el ID correcto del documento
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Datos del documento:", docSnap.data());
  } else {
    console.log("No se encontró el documento");
  }
}

// Llama a la función para obtener los datos
// obtenerDocumento();


async function agregarDocumento() {
    try {
      const docRef = await addDoc(collection(db, "lista"), {
        nombre: "Pikachu",  // Reemplaza con los datos que desees
        tipo: "Eléctrico",
        peso: 6,
        poder: 55
      });
      console.log("Documento agregado con ID: ", docRef.id);
    } catch (e) {
      console.error("Error agregando documento: ", e);
    }
  }
  
//   // Llama a la función para agregar un documento
// agregarDocumento();
  
//   // Llama a la función para obtener los datos
// obtenerDocumento();



async function obtenerTodosLosDocumentos() {
    const querySnapshot = await getDocs(collection(db, "lista"));
    const todosLosDatos = [];
    querySnapshot.forEach((doc) => {
      todosLosDatos.push({ id: doc.id, ...doc.data() }); // Agrega el ID y los datos del documento
    });
    console.log("Todos los documentos:", todosLosDatos);
  }
  
//   // Llama a la función para obtener todos los documentos
obtenerTodosLosDocumentos();



