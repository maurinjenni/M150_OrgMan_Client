import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem, MenuItem, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Console } from '@angular/core/src/console';

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

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
        private confirmationService: ConfirmationService, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
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

        this.mandatories = [
            {titel: 'Mandatory1', key: 'M1'},
            {titel: 'Mandatory2', key: 'M2'},
            {titel: 'Mandatory3', key: 'M3'}
        ];
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
        this.currentAddress = {
            firstname: 'TestFirstname',
            lastname: 'TestLastname'
        };
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

    confirmSaveNewAddress() {
        this.confirmationService.confirm({
            message: 'Save new address?',
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
                console.log('test');
            }
        });
    }
}
