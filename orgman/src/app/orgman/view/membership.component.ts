import { Router } from '@angular/router';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode, DataTable} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';

@Component({
    templateUrl: './membership.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MembershipComponent implements OnInit {

    membershipData: any[];

    selectedMembership: any;

    loading: boolean;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
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
            this.membershipData = [
                {Id: 1, Code: 'M1', Title: 'Membership1'},
                {Id: 2, Code: 'M2', Title: 'Membership2'},
                {Id: 3, Code: 'M3', Title: 'Membership3'},
                {Id: 4, Code: 'M4', Title: 'Membership4'}
            ];
            this.loading = false;
        }, 1000);
    }

    handleRowDblclick(event) {
        this.router.navigate(['/membership', event.data.Id]);
    }

    createNewMembership() {
        this.router.navigate(['/membership', 'new']);
    }
}
