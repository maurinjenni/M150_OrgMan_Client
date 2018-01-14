import { Component, OnInit, OnDestroy } from '@angular/core';
import {SelectItem, MenuItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './addressdetail.component.html',
    styles: [
        `.fullwidth {
            width: 100%;
        }
        `
    ]
})
export class AddressDetailComponent implements OnInit, OnDestroy {

    currentAddressId: any;

    private sub: any;

    country: any;

    filteredCountries: any[];

    mandatories: any[];

    constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.currentAddressId = params['param'];
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
}
