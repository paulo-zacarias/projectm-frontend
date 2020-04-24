import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        const authToken = localStorage.getItem('token');

        if (authToken) {
          request = request.clone({
            setHeaders: {
                Authorization: 'Token ' + authToken
            }
          });
        }

        return next.handle(request);
  }
}
