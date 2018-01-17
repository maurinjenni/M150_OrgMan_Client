import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode, SelectItem, MenuItem, ButtonModule, ConfirmationService, ConfirmDialogModule} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {CalendarService} from '../service/calendarService';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

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
    encapsulation: ViewEncapsulation.None,
    providers:[ConfirmationService]
})
export class CalendarComponent implements OnInit {

    events: any[];

    scheduleHeader: any;

    displayEventDetail: boolean;

    eventDetail : any;

    constructor(private breadcrumbService: BreadcrumbService,
    private calendarService: CalendarService,
    private router: Router,
    private confirmationService: ConfirmationService) {
        this.breadcrumbService.setItems([
            { label: 'Calendar' }
        ]);
     }

    ngOnInit() {
        this.eventDetail = {};
        this.events = [];

        const response = this.calendarService.get().then((responseData) => {
            this.displayEventDetail = false;

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

    handlEventclick(event){
        console.log(event);
        this.router.navigate(['/calendar', event.calEvent.id]);
    }
}
