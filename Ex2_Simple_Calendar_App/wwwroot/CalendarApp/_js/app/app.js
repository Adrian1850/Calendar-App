import { CalendarEventList } from '../models/CalendarEventList.js';

import mustache from '../libs/mustache.js';
export class App {

    constructor(settings) {

        settings = settings || {};

        if (settings instanceof App) return app;
        window.app = window.app ?? this;

        this.version = 1;
        this.year = new Date().getFullYear();
        this.footerSelector = 'footer';
        this.owner = 'Adrian Cruz';
        this.EventList = new CalendarEventList();
        Object.assign(this, settings);
        this.updateCopyrightInfo();
        this.date = new Date().getDate;


    }

    updateCopyrightInfo() {

        let footer = document.querySelector(this.footerSelector);

        if (footer) {
            footer.innerHTML = `&copy ${this.year} ${this.owner}, All Rights Reserved.`;
        }
    }
    async loadCalendar(settings) {

            let url = settings.url,
                selector = settings.selector;

            await this.getCalendar(url);
            await this.renderCalendar(selector);
        }

    async getCalendar(url) {

            let request = await fetch(url);
            let response = await request.json();
            this.EventList.addEvents(response.items);
        }

    async renderCalendar(selector) {

            let request = await fetch("/CalendarApp/views/event-list.html");

            let htmlTemplate = await request.text();

            let targetElement = document.querySelector(selector);

            let htmlContent = mustache.render(htmlTemplate, this.EventList);

            targetElement.innerHTML = htmlContent;
        }
    }