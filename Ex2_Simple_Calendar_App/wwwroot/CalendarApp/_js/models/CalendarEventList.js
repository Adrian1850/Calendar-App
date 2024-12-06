import { CalendarEvent } from '../models/CalendarEvent.js';

export class CalendarEventList {

    constructor(settings) {

        // Spit back the object if the input is the same type
        // Useful trick for better VS Code intellisense
        if (settings instanceof CalendarEventList) return settings;

        // Establish Default Values for Custom Properties
        this.events = [];


        // Use settings object to inject any custom property values desired
        Object.assign(this, settings);
    }

    // Add each item and transform it into our model
    addEvents(eventList) {

        if (!Array.isArray(eventList)) {
            console.log("Supplied value is not an array.");
            return false;
        }

        eventList.forEach((event) => {

            let newEvent = new CalendarEvent(event);

            this.events.push(newEvent);

        });

    }
}