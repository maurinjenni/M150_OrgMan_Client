import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

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
