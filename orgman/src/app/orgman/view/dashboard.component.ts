import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    searchResult: any;

    events: any;

    constructor(private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {
        this.searchResult = [
            {'brand': 'VW', 'year': 2012, 'color': 'White', 'vin': 'dsad231ff'},
            {'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345'},
            {'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr'},
            {'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh'},
            {'brand': 'Mercedes', 'year': 1995, 'color': 'White', 'vin': 'hrtwy34'},
            ];

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
}
