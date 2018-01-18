import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem, MenuItem, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Console } from '@angular/core/src/console';
import { AddressService } from '../service/addressService';
import { DatePipe } from '@angular/common';
import {CheckboxModule} from 'primeng/primeng';
import {MembershipService} from '../service/membershipService';
import { elementEventFullName } from '@angular/core/src/view/util';
import {MandatorService} from '../service/mandatorService';

@Component({
    templateUrl: './addressdetail.component.html',
    styles: [ `
      fieldset{
          border-style: none;
          padding: 0;
          margin: 0;
      }
    `],
    providers: [ConfirmationService]
})
export class AddressDetailComponent implements OnInit, OnDestroy {

    currentAddressId: any;

    currentAddress: any;

    private sub: any;

    country: any;

    filteredCountries: any[];

    mandatories: any[];

    editMode = false;

    createNewAddressMode = false;

    memberships : any[];

    mandators : any [];

    saulations: any[];

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
        private confirmationService: ConfirmationService, private router: Router, private addressService: AddressService, private membershipService : MembershipService, private mandatorService: MandatorService) {}

    ngOnInit() {
        this.currentAddress = {};
        this.currentAddress.Person = {};
        this.currentAddress.Adress = {};
        this.currentAddress.MemberInformation = {};
        this.currentAddress.Emails = [];
        this.currentAddress.Phones = [];
        this.memberships = [];
        this.mandators = [];
        this.saulations = [];
        
        this.sub = this.route.params.subscribe(params => {
            this.loadMemberships();
            this.loadMandators();
            this.loadSaluation();


            const param = params['param'];
            if (param === 'new') {
                this.createNewAddressMode = true;
                this.editMode = true;
            } else {
                this.currentAddressId = param;
                this.editMode = false;
                this.loadAddress();
            }
        });

        this.breadcrumbService.setItems([
            { label: 'Addressmanagement', routerLink: ['/address'] },
            { label: this.currentAddressId }
        ]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getCountries(): any[] {
        const data = [
            {'name': 'Afghanistan', 'code': 'AF'},
            {'name': 'Åland Islands', 'code': 'AX'},
            {'name': 'Albania', 'code': 'AL'},
            {'name': 'Algeria', 'code': 'DZ'},
            {'name': 'American Samoa', 'code': 'AS'},
            {'name': 'Andorra', 'code': 'AD'},
            {'name': 'Angola', 'code': 'AO'},
            {'name': 'Anguilla', 'code': 'AI'},
            {'name': 'Antarctica', 'code': 'AQ'},
            {'name': 'Antigua and Barbuda', 'code': 'AG'},
            {'name': 'Argentina', 'code': 'AR'},
            {'name': 'Armenia', 'code': 'AM'},
            {'name': 'Aruba', 'code': 'AW'},
            {'name': 'Australia', 'code': 'AU'},
            {'name': 'Austria', 'code': 'AT'},
            {'name': 'Azerbaijan', 'code': 'AZ'},
            {'name': 'Bahamas', 'code': 'BS'},
            {'name': 'Bahrain', 'code': 'BH'},
            {'name': 'Bangladesh', 'code': 'BD'},
            {'name': 'Barbados', 'code': 'BB'},
            {'name': 'Belarus', 'code': 'BY'},
            {'name': 'Belgium', 'code': 'BE'},
            {'name': 'Belize', 'code': 'BZ'},
        ];

        return data;
    }

    filterCountry(event) {
        const query = event.query;
        const countries = this.getCountries();
        this.filteredCountries = this.searchCountry(query, countries);
    }

    searchCountry(query, countries: any[]): any[] {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

    loadAddress() {
        this.addressService.getByUid(this.currentAddressId).then((response) => {
            let datePipe = new DatePipe("en-US");
            const object = JSON.parse(response.toString());

            this.currentAddress = object;

            this.currentAddress.BirthDate = new Date(datePipe.transform(this.currentAddress.BirthDate, 'MM/dd/yyyy'))
            this.currentAddress.MemberInformation.EntryDate = new Date(datePipe.transform(this.currentAddress.MemberInformation.EntryDate, 'MM/dd/yyyy'))
            this.currentAddress.MemberInformation.ExitDate = new Date(datePipe.transform(this.currentAddress.MemberInformation.ExitDate, 'MM/dd/yyyy'))
            
            this.currentAddress.MemberInformation.MembershipUIDs = [];
            this.currentAddress.MemberInformation.MemberInformationToMemberships.forEach(element => {
                this.currentAddress.MemberInformation.MembershipUIDs.push(element.MembershipUID);
            });

            this.currentAddress.Person.MandatorUIDs = [];

            this.currentAddress.Person.PersonToMandators.forEach(element => {
                this.currentAddress.Person.MandatorUIDs.push(element.MandatorUID);
            });
            
        }).catch((response) => {
            console.log(response);
        });
    }

    loadMemberships(){
        this.membershipService.get().then((response) => {
            const objects = JSON.parse(response.toString());

            objects.forEach(element => {
                this.memberships.push({
                    "label" : element.Title,
                    "value": element.UID
                });
            });;

        }).catch((response) => {
            console.log(response);
        });
    }

    loadMandators(){
        this.mandatorService.get().then((response) => {
            const objects = JSON.parse(response.toString());

            objects.forEach(element => {
                this.mandators.push({
                    "label" : element.Title,
                    "value": element.UID
                });
            });;

        }).catch((response) => {
            console.log(response);
        });
    }

    loadSaluation(){

        this.saulations = [
            {label: 'Herr', value: "aad0819b-f5d3-be1b-e579-f5fd1f119905"},
            {label: 'Frau', value: '8EFAEAA9-BEAA-32BB-9F5E-002ED4842FA5'},
        ];
    }

    // confirmdialogs: new address
    confirmDiscardAndReturn() {
        this.confirmationService.confirm({
            message: 'Discard your changes and return to the addresslist?',
            accept: ()  => {
                this.router.navigate(['/address']);
            }
        });
    }

    // confirmdialogs: existing address
    changeToEditMode() {
        this.editMode = true;
    }

    confirmDiscardChanges() {
        this.confirmationService.confirm({
            message: 'Discard your current changes?',
            accept: ()  => {
                this.editMode = false;
                this.loadAddress();
            }
        });
    }

    confirmSaveChanges() {
        this.confirmationService.confirm({
            message: 'Save your changes?',
            accept: ()  => {
                this.currentAddress.MemberInformation.MemberInformationToMemberships = [];
                this.currentAddress.Person.PersonToMandators = [];
                
                this.currentAddress.MemberInformation.MembershipUIDs.forEach(element => {
                    this.currentAddress.MemberInformation.MemberInformationToMemberships.push({
                        'MembershipUID' : element,
                        'MemberInformationUID': this.currentAddress.MemberInformation.UID
                    })
                });

                this.currentAddress.Person.MandatorUIDs.forEach(element => {
                    this.currentAddress.Person.PersonToMandators.push({
                        'MandatorUID' : element
                    })
                });

                this.currentAddress.MemberInformation.MembershipUIDs = undefined;
                this.currentAddress.Person.MandatorUIDs = undefined;

                // this.currentAddress.Person.SalutationUID = "aad0819b-f5d3-be1b-e579-f5fd1f119905"
                this.currentAddress.Adress.CountryUID="673658b0-85af-cd5a-342c-017c6aebf261";
                
                if(this.createNewAddressMode){
                    this.addressService.put(this.currentAddress).then((response) => {
                        const adressUid = JSON.parse(response.toString());
                        this.router.navigate(['/address', adressUid]);
                    }).catch((response) => {
                        console.log(response);
                    });
                }else {
                    this.addressService.post(this.currentAddress).then((response) =>{
                        const object = JSON.parse(response.toString());
                        this.editMode = false;
                        this.router.navigate(['/address', object.UID]);
                    }).catch((response) => {
                        console.log(response);
                    });
                }   
            }
        });
    }
}
