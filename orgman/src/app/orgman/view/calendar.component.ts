import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

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

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Calendar' }
        ]);
     }

    ngOnInit() {

        this.events = [
            {
                'id': 1,
                'title': 'Meeting1',
                'start': '2018-01-12T10:30:00',
                'end': '2018-01-12T12:30:00'
            },
            {
                'id': 2,
                'title': 'Meeting2',
                'start': '2018-02-12T10:30:00',
                'end': '2018-02-12T12:30:00'
            },
        ];

        this.scheduleHeader = { left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay'};
    }
}
