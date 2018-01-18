import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import {AuthenticationService} from '../service/authenticationService';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {


    username: string;
    password: string;

    constructor(private breadcrumbService: BreadcrumbService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private location: Location,
        private activatedRoute: ActivatedRoute) {
        this.breadcrumbService.setItems([
            { label: 'Login Page'}
        ]);
     }

    ngOnInit() {
       if (this.authenticationService.isLoggedIn) {
           this.router.navigateByUrl('');
       }
       this.username = '';
       this.password = '';
    }

    OnLoginClick() {
        const promise = this.authenticationService.login(this.username, this.password);

        promise.then(() => {
            this.router.navigateByUrl('');
        }).catch(() => {
            this.router.navigateByUrl('login');
        });
    }
}
