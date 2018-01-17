import { Router, NavigationEnd } from '@angular/router';
import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo"></div>
            </div>

            <div class="topbar-right">
                <a *ngIf="isLoggedIn" id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
            </div>
        </div>
    `
})
export class AppTopbarComponent {

    isLoggedIn: boolean;

    constructor(public app: AppComponent, private router: Router) {
         this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const urlSlice = e.url.toString().substr(0, 10);
                if (urlSlice.indexOf('login') !== -1) {
                    this.isLoggedIn = false;
                } else {
                    this.isLoggedIn = true;
                }
            }
        });
    }

}
