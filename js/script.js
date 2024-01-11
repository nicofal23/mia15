// Define la fecha objetivo (24 de abril a las 20:00 horas)
const targetDate = new Date("April 24, 2024 20:00:00").getTime();

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
        location: 'Ubicación del Evento',
        description: 'Descripción del Evento',
        start: new Date('2024-04-22T20:00:00'),
        end: new Date('2024-04-23T00:00:00'),
    };

    const startDate = evento.start.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = evento.end.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evento.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(evento.description)}&location=${encodeURIComponent(evento.location)}`;

    window.open(googleCalendarUrl, '_blank');
}