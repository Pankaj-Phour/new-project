import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let changedReq;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      changedReq = req.clone({
        headers
      });
    return next.handle(changedReq).pipe(tap(event => {},err => {}));
  }
}
