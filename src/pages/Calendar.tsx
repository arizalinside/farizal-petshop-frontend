import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Calendar = () => {
  return (
    <>
      <Breadcrumb pageName="Kalender" />
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey="AIzaSyAftBoRJkmd8YT1Z5t97jzB7CMG7dGEPNw"
        events={{
          googleCalendarId: 'id.indonesian#holiday@group.v.calendar.google.com',
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
      />
    </>
  );
};

export default Calendar;
