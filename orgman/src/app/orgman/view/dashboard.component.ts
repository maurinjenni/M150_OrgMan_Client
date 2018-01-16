import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { Router } from '@angular/router';

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

    constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {

        this.events = [
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test',
          '12.12.12: Test'
        ];
    }

    loadSearchResults() {
        this.loading = true;
        setTimeout(() => {
            this.searchResult = [
                {Id: 1, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
                {Id: 2, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
                {Id: 3, Firstname: 'Hallo', Lastname: 'Test', Street: 'Test',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
                {Id: 4, Firstname: 'Test', Lastname: 'Test', Street: 'Hallo',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
                {Id: 5, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
                {Id: 6, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
                HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'}
            ];
            this.loading = false;
        }, 1000);
    }

    handleRowDblclick(event) {
        this.router.navigate(['/address', event.data.Id]);
    }
}
