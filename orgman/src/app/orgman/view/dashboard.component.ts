import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { Router } from '@angular/router';
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

    searchResult: any[];

    events: any;

    selectedAddress: any;

    loading: boolean;

    searchText: string;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router, private addressService : AddressService, private calendarService: CalendarService ) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {

        // this.events = [
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test',
        //     '12.12.12: Test'
        //   ];
        this.events = []
        this.searchResult = [];

        this.calendarService.get().then((response) => {
            const object = JSON.parse(response.toString());
            object.forEach(element => {
                let datePipe = new DatePipe('en-US');

                if(datePipe.transform(element.StartDate, 'dd.MM.yyyy') == datePipe.transform(element.EndDate, 'dd.MM.yyyy')){
                    this.events.push(
                    datePipe.transform(element.StartDate, 'dd.MM.yyyy hh:mm') + " - " + datePipe.transform(element.EndDate, 'hh:mm') + " : " + element.Title);
                }else {
                    this.events.push(
                        datePipe.transform(element.StartDate, 'dd.MM.yyyy hh:mm') + " - " + datePipe.transform(element.EndDate, 'dd.MM.yyyy hh:mm') + " : " + element.Title);
                    }
                });
        }).catch((response) => {
            console.log(response);
        })
    }

    loadSearchResults() {
        this.loading = true;
        setTimeout(() => {
            this.addressService.getBySearchText(this.searchText).then((response) => {
                this.searchResult = [];
                var object = JSON.parse(response.toString());

                object.forEach(element => {
                    this.searchResult.push({
                        'Id': element.UID,
                        'Firstname': element.Firstname,
                        'Lastname': element.Lastname
                    });
                });
            }).catch((response) => {
                console.log(response)
            });

            // this.searchResult = [
            //     {Id: 1, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            //     {Id: 2, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            //     {Id: 3, Firstname: 'Hallo', Lastname: 'Test', Street: 'Test',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            //     {Id: 4, Firstname: 'Test', Lastname: 'Test', Street: 'Hallo',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            //     {Id: 5, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            //     {Id: 6, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            //     HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'}
            // ];
            
            this.loading = false;
        }, 1000);
    }

    handleRowDblclick(event) {
        this.router.navigate(['/address', event.data.Id]);
    }
}
