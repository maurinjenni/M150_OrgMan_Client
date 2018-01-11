import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

@Component({
    templateUrl: './address.component.html',
    styles: [`
        .cars-datalist ul {
            margin: 0;
            padding: 0;
        }

        @media (max-width:640px) {
            .cars-datalist .text-column {
                text-align: center;
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

    searchResult: any[];

    selectedAddress: any;

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Addressmanagement', routerLink: ['/address']}
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
}
