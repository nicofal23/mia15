// Define la fecha objetivo (27 de abril a las 20:00 horas)
const targetDate = new Date("April 27, 2024 20:00:00").getTime();

// Actualiza el contador cada segundo
const countdownInterval = setInterval(function() {
    // Obtiene la fecha y hora actual
    const currentDate = new Date().getTime();

    // Calcula la diferencia entre la fecha objetivo y la actual
    const timeDifference = targetDate - currentDate;

    // Calcula los días, horas, minutos y segundos restantes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Muestra el contador en un elemento HTML
    document.getElementById("countdown").innerHTML = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;

    // Detiene el contador cuando se alcanza la fecha objetivo
    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "¡La fecha objetivo ha llegado!";
    }
}, 1000); // Actualiza cada segundo



//calendar  
 
function agregarEventoAlCalendario() {
    const evento = {
        title: 'Cumple 15 Mia Antebi',
        location: 'G. del Cossio Bis 2198, Bis, S2006GBJ, Santa Fe',
        description: 'Cumpleaños XV Mia ',
        start: new Date('2024-04-27T20:00:00'),
        end: new Date('2024-04-23T00:00:00'),
    };

    const startDate = evento.start.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = evento.end.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evento.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(evento.description)}&location=${encodeURIComponent(evento.location)}`;

    window.open(googleCalendarUrl, '_blank');
}


// Ajusta la velocidad del parallax según tus necesidades
var parallaxSpeed = 0.5;

// Función para manejar el efecto parallax al hacer scroll
function parallaxEffect() { 
    var scrolled = window.scrollY;
    var parallax = document.querySelector('.parallax');

    // Ajusta la posición de fondo según el desplazamiento
    parallax.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
}

// Agrega un event listener al evento de scroll
window.addEventListener('scroll', parallaxEffect);




//spotify

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('container');

    for (var i = 0; i < 500; i++) {
        var blob = document.createElement('div');
        blob.className = 'blob';
        blob.style.animationDelay = Math.random() * 60 + 's';
        blob.style.left = Math.random() * 100 + 'vw';
        container.appendChild(blob);
    }
});

function enviarCancion() {
    // Obtener el valor del input
    var cancion = document.getElementById("songInput").value;

    // Verificar si el campo está vacío
    if (cancion.trim() === "") {
        // Mostrar alerta usando SweetAlert
        swal("Oops!", "Por favor agrega una canción para poder enviarla.", "error");
        return; // Salir de la función si el campo está vacío
    }

    // Construir el mensaje con la canción
    var mensaje = encodeURIComponent("Hola Mia, no puede faltar esta canción para tus XV: " + cancion);

    // Construir la URL de WhatsApp con el número y el mensaje
    var url = "https://api.whatsapp.com/send?phone=+5493417238582&text=" + mensaje;

    // Abrir la ventana de WhatsApp en una nueva pestaña
    window.open(url, "_blank");
}