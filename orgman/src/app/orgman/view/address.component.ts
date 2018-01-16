import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode, DataTable} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './address.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

    globalsearchtext: any;

    searchResult: any[];

    selectedAddress: any;

    loading: boolean;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
        this.breadcrumbService.setItems([
            { label: 'Addressmanagement'}
        ]);
     }

    ngOnInit() {
            this.loadAllAddressData();
    }

    handleRowDblclick(event) {
        this.router.navigate(['/address', event.data.Id]);
    }

    resetDatatable(dt: DataTable) {
        dt.reset();
        this.globalsearchtext = '';
    }

    loadAllAddressData() {
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

    navigateToNewAddress() {
        this.router.navigate(['/address', 'new']);
    }
}
