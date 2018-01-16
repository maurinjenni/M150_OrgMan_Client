import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {CalendarService} from '../service/calendarService';

@Component({
    templateUrl: './calendar.component.html',
    styles: [`
        .cars-datalist ul {
            margin: 0;
            padding: 0;
        }

        @media (max-width:640px) {
            .cars-datalist .text-column {
                text-align: center;
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

    events: any[];

    scheduleHeader: any;

    constructor(private breadcrumbService: BreadcrumbService,
    private calendarService: CalendarService) {
        this.breadcrumbService.setItems([
            { label: 'Calendar' }
        ]);
     }

    ngOnInit() {

        const response = this.calendarService.get().then((responseData) => {
            this.events = [];

            const object = JSON.parse(responseData.toString());
            object.forEach(element => {
                this.events.push({
                    'id': element.UID,
                    'title': element.Title,
                    'start': element.StartDate,
                    'end': element.EndDate
                });
            });
        }).catch(() => {
            console.log(response);
        });

        this.scheduleHeader = { left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay'};
    }
}
