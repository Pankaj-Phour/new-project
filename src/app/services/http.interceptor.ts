import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let changedReq;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      });
      changedReq = req.clone({
        headers
      });
    return next.handle(changedReq).pipe(tap(event => {},err => {}));
  }
}
