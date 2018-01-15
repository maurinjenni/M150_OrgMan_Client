import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from './cookieService';

@Injectable()
export class AuthenticationService {

     constructor(
        private http: Http, 
        private router: Router, 
        private cookieService: CookieService) {}  

    isLoggedIn() : boolean{
        var cookie = this.cookieService.getCookie("OrgMan_SessionUid");
        
        if(cookie){
            return true;
        }

        return false;
    }

    login(username: string, password: string ){
        let requestHeaders = new Headers();

        requestHeaders.append('Content-Type', 'application/json');

        let url = 'http://www.orgman.ch:81/api/authentication/login';

        var obj = {
            "Username" : username,
            "Password" : password
        };

        let body = JSON.stringify(obj);

        let promise = new Promise((resolve, reject) => {
            this.http.put(url, body, {headers: requestHeaders}).toPromise().then(
                (response) => {
                    console.log(response);
                    this.cookieService.setCookie('OrgMan_SessionUid', response["_body"],1);
                    resolve(response["_body"]);
                }
            ).catch((response) => {
                    console.log('Invalid Login information');
                    reject();
            })
        });

        return promise;


    } 
    
    logout(){
        this.cookieService.deleteCookie('OrgMan_SessionUid');
    }
}