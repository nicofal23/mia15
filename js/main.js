import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
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

document.addEventListener('DOMContentLoaded', function() {
  // Agregar event listener para el botón de enviar
  document.getElementById('enviarBtn').addEventListener('click', () => {
      const textoInput = document.getElementById('textoInput').value;
      guardarEnFirebase(textoInput);
  });

  // Agregar event listener para el botón de iniciar sesión
  document.getElementById('iniciarSesionBtn').addEventListener('click', iniciarSesion);

  // Llamar a la función mostrarMensajes al cargar la página para mostrar los mensajes existentes
  mostrarMensajes();
});

function mostrarMensajes() {
  const listaMensajes = document.getElementById('mostrarLista');
  
  // Obtener los mensajes de Firebase y mostrarlos en el elemento listaMensajes
  const mensajesRef = ref(database, 'mensajes');
  onValue(mensajesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
          Object.entries(data).forEach(([key, mensaje]) => {
              // Verificar si el mensaje ya existe en la lista
              if (!document.getElementById(key)) {
                  const listItem = document.createElement('div');
                  listItem.classList.add('mensaje-item');
                  // Asignar un id único al elemento div que representa el mensaje
                  listItem.id = key;
              
                  const mensajeText = document.createElement('p');
                  mensajeText.textContent = mensaje.mensaje;
                  listItem.appendChild(mensajeText);
              
                  const deleteButton = document.createElement('button');
                  deleteButton.textContent = 'Eliminar';
                  deleteButton.addEventListener('click', () => {
                      eliminarMensaje(key); // Llamar a la función para eliminar el mensaje cuando se hace clic en el botón
                  });
                  listItem.appendChild(deleteButton);
              
                  listaMensajes.appendChild(listItem);
              }
          });
          
          // Agregar un botón para eliminar toda la lista si aún no está presente
          if (!document.getElementById('eliminarListaButton')) {
              const eliminarListaButton = document.createElement('button');
              eliminarListaButton.id = 'eliminarListaButton';
              eliminarListaButton.textContent = 'Eliminar lista';
              eliminarListaButton.addEventListener('click', () => {
                  eliminarLista();
              });
              listaMensajes.appendChild(eliminarListaButton);
          }
      } else {
          console.log("No hay mensajes en Firebase.");
      }
  }, (error) => {
      console.error("Error al obtener los mensajes: ", error);
  });
}


function eliminarMensaje(key) {
  const mensajeRef = ref(database, `mensajes/${key}`);
  remove(mensajeRef)
    .then(() => {
      console.log("Mensaje eliminado correctamente.");
      // Actualizar la interfaz de usuario eliminando el elemento HTML asociado al mensaje
      const listItem = document.getElementById(key);
      listItem.remove();
      // Volver a mostrar el botón para eliminar la lista
      
    })
    .catch((error) => {
      console.error("Error al eliminar el mensaje: ", error);
    });
    
}

function eliminarLista() {
const mensajesRef = ref(database, 'mensajes');
set(mensajesRef, null)
  .then(() => {
    console.log("Lista de mensajes eliminada correctamente.");
    // Limpiar la lista después de eliminarla de la base de datos
    const listaMensajes = document.getElementById('mostrarLista');
    listaMensajes.innerHTML = '';
  })
  .catch((error) => {
    console.error("Error al eliminar la lista de mensajes: ", error);
  });
}

function iniciarSesion() {
const nombreUsuario = document.getElementById('nombreUsuario').value;
const contrasena = document.getElementById('contrasena').value;

// Realiza una consulta a la base de datos para verificar las credenciales
const usuarioRef = ref(database, 'usuario');
get(usuarioRef).then((snapshot) => {
    if (snapshot.exists()) {
        const usuario = snapshot.val().usuario;
        const clave = snapshot.val().clave;

        // Verifica si las credenciales son correctas
        if (nombreUsuario === usuario && contrasena === clave) {
            // Oculta el formulario de inicio de sesión
            const formularioIngreso = document.querySelector('.ingreso');
            formularioIngreso.style.display = 'none';

            // Muestra el modal
            mostrarModal();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } else {
        alert('Usuario no encontrado');
    }
}).catch((error) => {
    console.error("Error al obtener el usuario: ", error);
});
}

function mostrarModal() {
const modal = document.getElementById('modal');
modal.style.display = 'block';
}
