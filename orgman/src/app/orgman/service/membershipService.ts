import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from './cookieService';

@Injectable()
export class MembershipService {

     constructor(
        private http: Http,
        private cookieService: CookieService) {}

    get() {
        const requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        const requestOptions = new RequestOptions({headers: requestHeaders});

        const promise = new Promise((resolve, reject) => {
            this.http.get('http://www.orgman.ch:81/api/membership', requestOptions).toPromise()
            .then((response) => {
                resolve(response['_body']);
            }).catch((response) => {
                reject(response['_body']);
            });
        });

        return promise;
    }

    getByUid(uid) {
        const requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        const requestOptions = new RequestOptions({headers: requestHeaders});

        const promise = new Promise((resolve, reject) => {
            this.http.get('http://www.orgman.ch:81/api/membership/' + uid, requestOptions).toPromise()
            .then((response) => {
                resolve(response['_body']);
            }).catch((response) => {
                reject(response['_body']);
            });
        });

        return promise;
    }

    put() {

    }

    post(membership) {
        const requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        const requestOptions = new RequestOptions({headers: requestHeaders});

        const promise = new Promise((resolve, reject) => {
            this.http.post('http://www.orgman.ch:81/api/membership', membership, requestOptions).toPromise()
            .then((response) => {
                resolve(response['_body']);
            }).catch((response) => {
                reject(response['_body']);
            });
        });

        return promise;
    }

    delete(uid) {
        const requestHeaders = new Headers();

        requestHeaders.append('OrgMan_SessionUid', this.cookieService.getCookie('OrgMan_SessionUid'));

        const requestOptions = new RequestOptions({headers: requestHeaders});

        const promise = new Promise((resolve, reject) => {
            this.http.delete('http://www.orgman.ch:81/api/membership/' + uid, requestOptions).toPromise()
            .then((response) => {
                resolve(response['_body']);
            }).catch((response) => {
                reject(response['_body']);
            });
        });

        return promise;
    }
}
