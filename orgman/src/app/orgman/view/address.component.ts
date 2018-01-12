import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './address.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

    searchResult: any[];

    selectedAddress: any;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
        this.breadcrumbService.setItems([
            { label: 'Addressmanagement'}
        ]);
     }

    ngOnInit() {
        this.searchResult = [
            {Id: 1, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Id: 2, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Id: 3, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Id: 4, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Id: 5, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Id: 6, Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'}
        ];
    }

    handleRowDblclick(event) {
        this.router.navigate(['/address', event.data.Id]);
    }
}
