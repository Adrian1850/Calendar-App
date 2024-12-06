export class CalendarEvent {

    constructor(settings) {

        this.summary = 'Blank Event';
        this.description = 'Blank Event Description';
        this.location = 'Somewhere Happy';
        this.start = {};
        this.end = {};

        settings = settings || {};

        Object.assign(this, settings);

        this.allDay = this.start.date ? true : false;

        if (this.start.date) {
            this.start.date = `${this.start.date} PST`;
        }
    }
    get timeStart() {
        if (this.start.dateTime) {
            let dateTime = new Date(this.start.dateTime);
            let time = dateTime.toLocaleTimeString('en-US', { timeStyle: 'short' })

            return `${time}`;
        }
        return false;
    }

    get timeEnd() {
        if (this.end.dateTime) {
            let dateTime = new Date(this.end.dateTime);
            let time = dateTime.toLocaleTimeString('en-us', { timeStyle: 'short' });
            return `${time}`;
        }
        return false;
    }

    timeDate(type) {

        let dateTime = this[type]?.dateTime;

        this.start.dateTime;

        if (dateTime) {
            let date = new Date(dateTime);
            return date.toLocaleDateString();
        }
        return false;
    }

    dateStart() {
        let date = this.start.date ?? this.start.dateTime;
        let dateTime = new Date(date);
        return dateTime;
    }

    // Month of the start date
    get startMonth() {
        return this.dateStart().toLocaleString('en-us', { month: 'short' });
    }

    // Day of the start date
    get startDay() {
        return this.dateStart().toLocaleString('en-us', { day: '2-digit' });
    }

    // A sortable date object
    get sortDate() {
        return new Date(this.start.date ?? this.start.dateTime);
    }

    // Returns the date of the event in a string we can display
    get eventDate() {

        let dateString = "No Date Available",
            sDate = "01/01/2001",
            eDate = "01/01/2001";

        if (this.allDay) {

            sDate = new Date(this.start.date);
            eDate = new Date(this.end.date);

            // If the dates are essentially the same, just use 1 and say "All Day"
            if (eDate.getUTCDay() - sDate.getUTCDay() < 2) {
                dateString = `${sDate.toLocaleDateString()} (All Day)`;
            } else {
                // The dates are different, we'll print out each date *and* time
                dateString = `${sDate.toLocaleDateString()} - ${eDate.toLocaleDateString()}`;
            }
        }
        else {

            sDate = this.timeDate("start");
            eDate = this.timeDate("end");

            if (sDate != eDate) {
                dateString = `${sDate} (${this.timeStart}) - ${eDate} (${this.timeEnd})`;
            }
            else {
                dateString = `${sDate} (${this.timeStart} - ${this.timeEnd})`;
            }
        }

        return dateString;
    }
}