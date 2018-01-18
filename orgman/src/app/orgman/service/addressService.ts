import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from './cookieService';

@Injectable()
export class AddressService {

     constructor(
        private http: Http,
        private cookieService : CookieService) {}  

    getBySearchText(searchtext : string){
        let requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        var requestOptions = new RequestOptions({headers: requestHeaders})
        
        let promise = new Promise((resolve, reject) => {
            this.http.get("http://www.orgman.ch:81/api/adress?searchString="+searchtext, requestOptions).toPromise()
            .then((response) => {
                resolve(response["_body"]);
            }).catch((response) => {
                reject(response["_body"]);
            });
        });

        return promise;
    }
    
    getByUid(uid){
        let requestHeaders = new Headers();
        
        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        var requestOptions = new RequestOptions({headers: requestHeaders})
        
        let promise = new Promise((resolve, reject) => {
            this.http.get("http://www.orgman.ch:81/api/adress" + uid, requestOptions).toPromise()
            .then((response) => {
                resolve(response["_body"]);
            }).catch((response) => {
                reject(response["_body"]);
            });
        });

        return promise;
    }


    put(){

    }

    post(){

    }

    delete(uid){

    }
}