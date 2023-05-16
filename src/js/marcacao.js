$(document).ready(function() {
    // Inicializa o calendário
    var calendar = $('#calendar').fullCalendar({
      defaultView: 'month',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: [
        {
          title: 'Consulta de cardiologia',
          start: '2023-05-10T10:30:00',
          end: '2023-05-10T12:00:00',
          location: 'Clínica XYZ',
          specialty: 'cardiology'
        },
        {
          title: 'Consulta de ortopedia',
          start: '2023-05-12T14:00:00',
          end: '2023-05-12T15:30:00',
          location: 'Hospital ABC',
          specialty: 'orthopedics'
        },
        {
          title: 'Consulta de neurologia',
          start: '2023-05-15T08:30:00',
          end: '2023-05-15T10:00:00',
          location: 'Consultório Dr. Fulano',
          specialty: 'neurology'
        },
        {
          title: 'Consulta de ginecologia',
          start: '2023-05-18T16:00:00',
          end: '2023-05-18T17:30:00',
          location: 'Hospital ABC',
          specialty: 'gynecology'
        }
      ],
      dayRender: function(date, cell) {
        var square = document.createElement('div');
        square.className = 'square';
        cell.append(square);
      }
    });
  
    // Define a função para filtrar os eventos
    function filterEvents(specialty, location) {
      calendar.fullCalendar('removeEvents');
  
      var filteredEvents = calendar.fullCalendar('clientEvents', function(event) {
        return event.specialty == specialty && event.location == location;
      });
  
      calendar.fullCalendar('renderEvents', filteredEvents);
    }
  
    // Adiciona o evento de clique no botão "Filtrar"
    $('#filter').click(function() {
      var specialty = $('#specialty').val();
      var location = $('#location').val();
  
      filterEvents(specialty, location);
    });
  });
  