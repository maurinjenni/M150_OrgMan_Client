import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem, MenuItem, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Console } from '@angular/core/src/console';
import {MembershipService} from '../service/membershipService';
import { DatePipe } from '@angular/common';


@Component({
    templateUrl: './membershipdetail.component.html',
    styles: [ `
      fieldset{
          border-style: none;
          padding: 0;
          margin: 0;
      }
    `],
    providers: [ConfirmationService]
})
export class MembershipDetailComponent implements OnInit, OnDestroy {

    currentMembershipId: any;

    private sub: any;

    mandatories: any[];

    membershipDetail: any;

    editMode = false;

    createNewMembershipMode = false;

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
        private confirmationService: ConfirmationService, private router: Router, private membershipService: MembershipService) {}

    ngOnInit() {
        this.membershipDetail = {};

        this.mandatories = [
            {label: 'Mr', value: 'e91019da-26c8-b201-1385-0011f6c365e9'},
            {label: 'Mandatory2', value: 'M2'},
            {label: 'Mandatory3', value: 'M3'}
        ];

        this.sub = this.route.params.subscribe(params => {
            const param = params['param'];
            if (param === 'new') {
                this.createNewMembershipMode = true;
                this.editMode = true;
            } else {
                this.currentMembershipId = param;
                this.editMode = false;
                this.loadmembership(this.currentMembershipId);
            }
        });

        this.breadcrumbService.setItems([
            { label: 'Membership', routerLink: ['/membership'] },
            { label: this.currentMembershipId }
        ]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    loadmembership(uid) {
        const datePipe = new DatePipe('en-US');

        this.membershipService.getByUid(uid).then((response) => {
            const object = JSON.parse(response.toString());
            this.membershipDetail = object;

            this.membershipDetail.StartDate = new Date(datePipe.transform(this.membershipDetail.StartDate, 'MM/dd/yyyy HH:mm'));
            this.membershipDetail.EndDate = new Date(datePipe.transform(this.membershipDetail.EndDate, 'MM/dd/yyyy HH:mm'));
        }).catch((response) => {
            console.log(response);
        });
    }

    // confirmdialogs: new membership
    confirmDiscardAndReturn() {
        this.confirmationService.confirm({
            message: 'Discard your changes and return to the membership-view?',
            accept: ()  => {
                this.router.navigate(['/membership']);
            }
        });
    }

    changeToEditMode() {
        this.editMode = true;
    }

    confirmDiscardChanges() {
        this.confirmationService.confirm({
            message: 'Discard your current changes?',
            accept: ()  => {
                this.editMode = false;
                this.loadmembership(this.membershipDetail.UID);
            }
        });
    }

    confirmSaveChanges() {
        this.confirmationService.confirm({
            message: 'Save your changes?',
            accept: ()  => {
                if (this.createNewMembershipMode) {
                    this.membershipService.put(this.membershipDetail).then((response) => {
                        const membershipUid = JSON.parse(response.toString());

                        this.router.navigate(['/membership', membershipUid]);
                    }).catch((response) => {
                        console.log(response);
                    });

                }else {
                    this.membershipService.post(this.membershipDetail).then((response) => {
                        const datePipe = new DatePipe('en-US');
                        const object = JSON.parse(response.toString());
                        this.membershipDetail = object;

                        this.membershipDetail.StartDate = new Date(datePipe.transform(this.membershipDetail.StartDate, 'MM/dd/yyyy HH:mm'));
                        this.membershipDetail.EndDate = new Date(datePipe.transform(this.membershipDetail.EndDate, 'MM/dd/yyyy HH:mm'));
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            }
        });
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Delete Membership?',
            accept: ()  => {
                this.membershipService.delete(this.membershipDetail.UID).then((response) => {
                    this.router.navigate(['/membership']);
                }).catch((response) => {
                    console.log(response);
                });
            }
        });
    }
}
