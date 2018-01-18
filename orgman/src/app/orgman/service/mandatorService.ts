import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from './cookieService';

@Injectable()
export class MandatorService {

     constructor(
        private http: Http,
        private cookieService : CookieService) {}  

    get(){

        
        let requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        var requestOptions = new RequestOptions({headers: requestHeaders})
        
        let promise = new Promise((resolve, reject) => {
            this.http.get("http://www.orgman.ch:81/api/mandator", requestOptions).toPromise()
            .then((response) => {
                resolve(response["_body"]);
            }).catch((response) => {
                reject(response["_body"]);
            });
        });

        return promise;
    }
}