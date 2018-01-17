import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem, MenuItem, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Console } from '@angular/core/src/console';
import {CalendarService} from '../service/calendarService';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './calendardetail.component.html',
    styles: [ `
      fieldset{
          border-style: none;
          padding: 0;
          margin: 0;
      }
    `],
    providers: [ConfirmationService]
})
export class CalendarDetailComponent implements OnInit, OnDestroy {

    currentEventId: any;

    private sub: any;

    mandatories: any[];
    
    eventDetail: any;
    
    editMode = false;
    
    createNewEventMode = false;

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
        private confirmationService: ConfirmationService, private router: Router, private calendarService: CalendarService) {}

    ngOnInit() {
        this.eventDetail = {};

        this.sub = this.route.params.subscribe(params => {
            const param = params['param'];
            if (param === 'new') {
                this.createNewEventMode = true;
                this.editMode = true;
            } else {
                this.currentEventId = param;
                this.editMode = false;
                this.loadevent(this.currentEventId);
            }
        });

        this.breadcrumbService.setItems([
            { label: 'Calendar', routerLink: ['/calendar'] },
            { label: this.currentEventId }
        ]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    loadevent(uid){
        let datePipe = new DatePipe('en-US');

        this.calendarService.getByUid(uid).then((response) => {
            const object = JSON.parse(response.toString());
            this.eventDetail = object;
            
            this.eventDetail.StartDate = new Date(datePipe.transform(this.eventDetail.StartDate, 'MM/dd/yyyy HH:mm'));
            this.eventDetail.EndDate = new Date(datePipe.transform(this.eventDetail.EndDate, 'MM/dd/yyyy HH:mm'));
        }).catch((response) => {
            console.log(response);
        })
    }

    // confirmdialogs: new event
    confirmDiscardAndReturn() {
        this.confirmationService.confirm({
            message: 'Discard your changes and return to the eventview?',
            accept: ()  => {
                this.router.navigate(['/calendar']);
            }
        });
    }

    confirmSaveNewEvent() {
        this.confirmationService.confirm({
            message: 'Save new event?',
            accept: ()  => {
                this.router.navigate(['/calendar']);
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
                this.loadevent(this.eventDetail.UID);
            }
        });
    }

    confirmSaveChanges() {
        this.confirmationService.confirm({
            message: 'Save your changes?',
            accept: ()  => {
                if(this.createNewEventMode){

                }else {
                    this.calendarService.post(this.eventDetail).then((response) =>{
                        let datePipe = new DatePipe('en-US');
                        const object = JSON.parse(response.toString());
                        this.eventDetail = object;
                        
                        this.eventDetail.StartDate = new Date(datePipe.transform(this.eventDetail.StartDate, 'MM/dd/yyyy HH:mm'));
                        this.eventDetail.EndDate = new Date(datePipe.transform(this.eventDetail.EndDate, 'MM/dd/yyyy HH:mm'));
                    }).catch((response) => {
                        console.log(response);
                    });
                }   
            }
        });
    }

    confirmDelete(){
        this.confirmationService.confirm({
            message: 'Delete Event?',
            accept: ()  => {
                this.calendarService.delete(this.eventDetail.UID).then((response) =>{
                    this.router.navigate(['/calendar']);
                }).catch((response) => {
                    console.log(response);
                });
            }
        });  
    }
}
