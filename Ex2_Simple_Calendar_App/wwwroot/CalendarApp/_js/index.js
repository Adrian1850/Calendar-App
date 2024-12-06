import { App } from '../_js/app/app.js';


const app = new App({
    owner: 'Adrian Cruz'
});

const calendarId = `213f3d889e1f7b3707950f4dedf02c6614f283edb34d527a0639caf43a229bdd@group.calendar.google.com`;
const apiKey = `AIzaSyAUYlHta_5W4E6JdtqI8D-xRrJ1TE6DTRw`;
const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
let query = `?key=${apiKey}&singleEvents=true`;

let targetUrl = `${apiUrl}${query}`;

app.loadCalendar({
    url: targetUrl,
    selector: "#MyCalendar"
});

(async () => {

    await app.getCalendar(targetUrl);

    await app.renderCalendar("#MyCalendar");

});