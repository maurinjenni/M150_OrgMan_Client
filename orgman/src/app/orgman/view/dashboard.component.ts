import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {

    }
}
