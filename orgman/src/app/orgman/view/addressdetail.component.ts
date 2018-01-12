import { Component, OnInit, OnDestroy } from '@angular/core';
import {SelectItem, MenuItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './addressdetail.component.html'
})
export class AddressDetailComponent implements OnInit, OnDestroy {

    currentAddressId: any;

    private sub: any;

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.currentAddressId = params['id'];
        });

        this.breadcrumbService.setItems([
            { label: 'Addressmanagement', routerLink: ['/address'] },
            { label: this.currentAddressId }
        ]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
