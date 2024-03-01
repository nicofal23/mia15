import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  databaseURL: "https://cumplemia-a876f-default-rtdb.firebaseio.com/",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

document.getElementById('enviarBtn').addEventListener('click', () => {
  const textoInput = document.getElementById('textoInput').value;
  guardarEnFirebase(textoInput);
});

function guardarEnFirebase(texto) {
  const newDataRef = push(ref(database, 'mensajes'));
  set(newDataRef, {
    mensaje: texto
  })
  .then(() => {
    swal("Canción enviada", "", "success");
    document.getElementById('textoInput').value = '';
    mostrarMensajes(); // Llamar a la función para mostrar mensajes después de guardar uno nuevo
    // Mostrar SweetAlert
    swal("Canción enviada", "", "success");
    // Limpiar el input
    document.getElementById('textoInput').value = '';
  })
  .catch((error) => {
    console.error("Error al guardar el mensaje: ", error);
  });
}