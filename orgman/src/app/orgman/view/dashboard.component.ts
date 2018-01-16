import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {AddressService} from '../service/addressService';
import {CalendarService} from '../service/calendarService';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [`
        .quicksearch-form {
            overflow: hidden;
        }

        .quicksearch-form .ui-panel {
            min-height: 340px;
        }

        .quicksearch-form .ui-g-12 {
            padding: 16px 10px;
        }

        .quicksearch-form .ui-button {
            margin-bottom: 30px;
        }
    `]
})
export class DashboardComponent implements OnInit {

    searchResult: any;

    events: any;

    searchText: string;

    constructor(private breadcrumbService: BreadcrumbService,
    private addressService: AddressService,
    private calendarService: CalendarService) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {
        this.searchResult = [
            // {'firstname': 'test', 'lastname': 'test'},
            // {'firstname': 'test', 'lastname': 'test'},
            // {'firstname': 'test', 'lastname': 'test'},
            // {'firstname': 'test', 'lastname': 'test'},
            // {'firstname': 'test', 'lastname': 'test'}
        ];

        this.events = []; 

        this.calendarService.get().then((response) => {
            var object = JSON.parse(response.toString());

            object.forEach(element => {
                let datePipe = new DatePipe('en-US');
                
                if(datePipe.transform(element.StartDate, 'dd.MM.yyyy') == datePipe.transform(element.EndDate, 'dd.MM.yyyy')){
                    this.events.push(
                        datePipe.transform(element.StartDate, 'dd.MM.yyyy hh:mm') + " - " + datePipe.transform(element.EndDate, 'hh:mm') + " : " + element.Title
                    );
                }else {
                    this.events.push(
                        datePipe.transform(element.StartDate, 'dd.MM.yyyy hh:mm') + " - " + datePipe.transform(element.EndDate, 'dd.MM.yyyy hh:mm') + " : " + element.Title
                    );
                }
            });

        }).catch((response) => {
            console.log(response);
        });

    }

    searchAdress(){
        this.addressService.getBySearchText(this.searchText).then((response) => {
            this.searchResult = []; 
            
            var object = JSON.parse(response.toString());

            object.forEach(element => {
                this.searchResult.push({
                    'firstname': element.Firstname,
                    'lastname': element.Lastname
                });
            });

        }).catch((response) => {
            console.log(response);
        });
    }
}
