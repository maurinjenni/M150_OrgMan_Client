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
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'},
            {Firstname: 'Test', Lastname: 'Test', Street: 'Test',
            HouseNumber: 'Test', Postcode: 'Test', City: 'Test', IsMember: 'Test'}
        ];
    }
}
