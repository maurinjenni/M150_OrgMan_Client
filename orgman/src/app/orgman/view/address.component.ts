import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode, DataTable} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { Router } from '@angular/router';
import { AddressService } from '../service/addressService';

@Component({
    templateUrl: './address.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

    globalsearchtext: any;

    searchResult: any[];

    selectedAddress: any;

    loading: boolean;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router, private addressService: AddressService) {
        this.breadcrumbService.setItems([
            { label: 'Addressmanagement'}
        ]);
     }

    ngOnInit() {
            this.loadAllAddressData();
    }

    handleRowDblclick(event) {
        this.router.navigate(['/address', event.data.UID]);
    }

    resetDatatable(dt: DataTable) {
        dt.reset();
        this.globalsearchtext = '';
    }

    loadAllAddressData() {
        this.loading = true;
        this.addressService.getBySearchText(this.globalsearchtext).then((response) => {
            const objects = JSON.parse(response.toString());

            this.searchResult = objects;
            this.loading = false;
        }).catch((response) => {
            console.log(response);
        });

    }

    navigateToNewAddress() {
        this.router.navigate(['/address', 'new']);
    }
}
