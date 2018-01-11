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
            {'firstname': 'test', 'lastname': 'test'},
            {'firstname': 'test', 'lastname': 'test'},
            {'firstname': 'test', 'lastname': 'test'},
            {'firstname': 'test', 'lastname': 'test'},
            {'firstname': 'test', 'lastname': 'test'}
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
