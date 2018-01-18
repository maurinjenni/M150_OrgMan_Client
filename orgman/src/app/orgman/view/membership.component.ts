import { Router } from '@angular/router';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode, DataTable} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import { MembershipService } from '../service/membershipService';

@Component({
    templateUrl: './membership.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MembershipComponent implements OnInit {

    membershipData: any[];

    selectedMembership: any;

    loading: boolean;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router, private membershipService: MembershipService) {
        this.breadcrumbService.setItems([
            { label: 'Settings'},
            { label: 'Membership'}
        ]);
     }

    ngOnInit() {
            this.loadAllMembershipData();
    }

    loadAllMembershipData() {
        this.loading = true;
        setTimeout(() => {
            this.membershipService.get().then((response) => {
                var objects = JSON.parse(response.toString());

                this.membershipData = objects;
            }).catch((response) => {
                console.log(response);
            });
            this.loading = false;
        }, 1000);
    }

    handleRowDblclick(event) {
        this.router.navigate(['/membership', event.data.UID]);
    }

    createNewMembership() {
        this.router.navigate(['/membership', 'new']);
    }
}
